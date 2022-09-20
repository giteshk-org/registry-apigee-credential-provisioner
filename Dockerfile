ARG NODE_VERSION=18
FROM node:${NODE_VERSION} as ts-compiler
WORKDIR /usr/app
COPY . ./
RUN npm install @angular/cli && npm install && npm run build

FROM gcr.io/distroless/nodejs:${NODE_VERSION}
ENV PORT=80
WORKDIR /usr/app
COPY --from=ts-compiler /usr/app/dist ./dist
COPY --from=ts-compiler /usr/app/src ./src