FROM nginx:1.15.5-alpine
WORKDIR /home/app
RUN apk add 'nodejs<9' npm git
COPY build/docker/default.conf /etc/nginx/conf.d/default.conf
RUN mkdir /usr/share/nginx/html/store-jhub
RUN mkdir /usr/share/nginx/html/store-jhub/static
COPY . /home/app
RUN npm install
RUN npm rebuild node-sass
RUN npm run build
RUN cp dist/index.html /usr/share/nginx/html/store-jhub/index.html
RUN cp -r dist/store-jhub/static/* /usr/share/nginx/html/store-jhub/static
CMD nginx -g "daemon off;"
