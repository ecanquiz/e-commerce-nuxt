FROM node:22.19.0 AS build
WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm run build

ENV PORT=80
ENV HOST=0.0.0.0

EXPOSE 80

CMD [ "node", ".output/server/index.mjs" ] 

## TODO
#FROM nginx:1.27.3
#COPY --from=build /app/dist /opt/site
#COPY nginx.conf /etc/nginx/nginx.conf

