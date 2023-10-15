# Important to use non-standart naming for env files
# such as .env.prod so NEXT doesnt load it automatically

if test "$APP_ENV" = "staging"
  then    
    cp ./.env.staging ./.env
fi
if test "$APP_ENV" = "production"
  then
    cp ./.env.prod ./.env
fi
if test "$APP_ENV" = "development"
  then
    cp ./.env.dev ./.env
fi
