FROM ruby:bullseye

RUN apt-get update -qq && apt-get install -y nodejs default-mysql-client

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash - \
    && apt-get install -y nodejs \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update && apt-get install yarn

WORKDIR /productivity-hub

COPY Gemfile Gemfile.lock ./

# RUN apt get install libc-bin=2.29 libc6=2.29
# RUN apt-get install pkg-config libxml2-dev libxslt-dev
RUN gem install nokogiri --platform=ruby

RUN bundle install

RUN gem install foreman

COPY . .

EXPOSE 3000
