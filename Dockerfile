FROM node:10.15.0-alpine AS builder

WORKDIR /app

# Install git required for codecov and chromatic cli's
RUN apk --no-cache add git

# Create the .npmrc file
RUN echo ${NPMRC} | base64 -d > .npmrc

# install npm
RUN apk add --update nodejs nodejs-npm

# Install CodeClimate Test Coverage Reporter
RUN apk --no-cache add curl  
RUN curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > "/usr/bin/cc-test-reporter" && chmod +x "/usr/bin/cc-test-reporter" && cp -p /usr/bin/cc-test-reporter /tmp/cc-test-reporter

# Copying application code
COPY . /app

# Install dependencies
RUN npm ci

#FROM node:10.15.0-alpine AS runner

# Expose Storybook port
EXPOSE 6006

# Adding production dependencies to image
# COPY --from=builder /tmp/node_modules /app/node_modules

# Copy Apps (Git and CodeCov)
# COPY --from=builder /tmp/ /usr/bin/

# Copying application code
# COPY . /app

CMD npm run build