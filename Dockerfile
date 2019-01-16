FROM node:10.15.0-alpine AS builder

WORKDIR /app

COPY package.json /app

# Create the .npmrc file
RUN echo ${NPMRC} | base64 -d > .npmrc

# Creating tar of productions dependencies
RUN npm i && cp -rp ./node_modules /tmp/node_modules

# Copying application code
COPY . /app

# Install CodeClimate Test Coverage Reporter
RUN apk --no-cache add curl  
RUN curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > "/usr/bin/cc-test-reporter" && chmod +x "/usr/bin/cc-test-reporter" && cp -p /usr/bin/cc-test-reporter /tmp/cc-test-reporter

FROM node AS runner

# Expose Storybook port
EXPOSE 6006
WORKDIR /app

# Adding production dependencies to image
COPY --from=builder /tmp/node_modules /app/node_modules
COPY --from=builder /tmp/cc-test-reporter /usr/bin/cc-test-reporter

# Copying application code
COPY . /app

CMD npm run build