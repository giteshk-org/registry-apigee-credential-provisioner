ARG NODE_VERSION=18
FROM node:${NODE_VERSION} as ng-builder
WORKDIR /usr/app
COPY . ./
RUN npm install @angular/cli && npm install && npm run build

FROM gcr.io/distroless/nodejs:${NODE_VERSION}
ENV PORT=80
WORKDIR /usr/app
COPY --from=ng-builder /usr/app/dist ./dist
COPY --from=ng-builder /usr/app/src/server ./src/server
COPY --from=ng-builder /usr/app/package*.json ./