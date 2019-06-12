FROM node:10.15.0-alpine AS builder

WORKDIR /app

# Install git required for codecov and chromatic cli's
RUN apk --no-cache add git

# # install npm
# RUN apk add --update nodejs nodejs-npm

# Install CodeClimate Test Coverage Reporter
RUN apk --no-cache add curl  
RUN curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > "/usr/bin/cc-test-reporter" && chmod +x "/usr/bin/cc-test-reporter" && cp -p /usr/bin/cc-test-reporter /tmp/cc-test-reporter

# Copying application code
COPY . /app

# Install dependencies
RUN npm ci

# Expose Storybook port
EXPOSE 6006

CMD npm run build