FROM node:13 as dist

WORKDIR /app

ARG NPM_REGISTRY

ADD package.json .
ADD package-lock.json .

RUN npm install --registry=${NPM_REGISTRY}

ADD . .

# 目前静态文件地址改为相对路径，再交由 Nginx 通过规则进行实际处理。
RUN sed -i "s/publicPath: '\/'/publicPath: '.\/'/g" vue.config.js && \
    sed -i 's/\/api/.\/api/g' src/api/* && \
    sed -i 's/src="https:\/\/[^"]*/src="static\/js\/system.src.js/g' public/index.html

RUN npm run build:prod


RUN chmod +r dist/static/js/DxHeader.umd.min.js && \
    curl https://cdn.bootcss.com/systemjs/0.21.6/system.src.js -o dist/static/js/system.src.js && \
    curl https://cdn.bootcss.com/systemjs/0.21.6/system.src.js.map -o dist/static/js/system.src.js.map && \
    chmod +r dist/static/js/system.src.js dist/static/js/system.src.js.map

FROM nginx:1.13.12-alpine

RUN echo "#!/bin/sh" > /entrypoint.sh && \
    echo "export DNS=\$(grep nameserver /etc/resolv.conf | awk 'NR<2 {print \$2}')" >> /entrypoint.sh && \
    echo 'sed -i "s/172.31.0.10/$DNS/g" /etc/nginx/nginx.conf' >> /entrypoint.sh && \
    echo 'sed -i "s/proxy_pass .*/proxy_pass http:\/\/$BACKEND\/\$1\$is_args\$args;/;" /etc/nginx/nginx.conf' >> /entrypoint.sh && \
    echo 'sed -i "s/\/\/[^/]*\/header\/DxHeader.umd.min.js/$(echo $HEADER_JS | sed "s/\//\\\\\//g")/g" /usr/share/nginx/html/index.html' >> /entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /entrypoint.sh && \
    chmod +x /entrypoint.sh

COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=dist /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["/entrypoint.sh"]
