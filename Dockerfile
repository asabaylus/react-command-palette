FROM node:10.15.0-alpine AS builder

WORKDIR /app

COPY package.json /app

# Install git required for codecov and chromatic cli's
RUN apk --no-cache add git

# Create the .npmrc file
RUN echo ${NPMRC} | base64 -d > .npmrc

# install npm
RUN apk add --update nodejs nodejs-npm

# Creating tar of production dependencies
RUN npm i && cp -rp ./node_modules /tmp/node_modules

# Copying application code
COPY . /app

# Install CodeClimate Test Coverage Reporter
RUN apk --no-cache add curl  
RUN curl -L https://codeclimate.com/downloads/test-reporter/test-reporter-latest-linux-amd64 > "/usr/bin/cc-test-reporter" && chmod +x "/usr/bin/cc-test-reporter" && cp -p /usr/bin/cc-test-reporter /tmp/cc-test-reporter

#FROM node:10.15.0-alpine AS runner

# Expose Storybook port
EXPOSE 6006
WORKDIR /app

# Adding production dependencies to image
# COPY --from=builder /tmp/node_modules /app/node_modules

# Copy Apps (Git and CodeCov)
# COPY --from=builder /tmp/ /usr/bin/

# Copying application code
# COPY . /app

CMD npm run build