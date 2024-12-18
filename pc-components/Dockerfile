FROM node:20 AS build-frontend

WORKDIR /app/frontend

COPY pc-components/package.json pc-components/package-lock.json ./

RUN npm ci

COPY pc-components/ ./

RUN npm run build

FROM nginx:alpine

COPY --from=build-frontend /app/frontend/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
