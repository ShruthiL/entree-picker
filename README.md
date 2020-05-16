[![Codeship Status for ShruthiL/entree-picker](https://app.codeship.com/projects/a1955430-72fb-0138-760f-56cb5888334c/status?branch=master)](https://app.codeship.com/projects/395719)

# Entrée Picker
Entrée Picker will suggest a random entrée from nearby restaurants for any given location, saving the user time and giving them the opportunity to explore varieties of food.
Visit the deployed application [here](https://entreepicker.herokuapp.com/)

## Authors
- Shruthi Lagisetty

## Built With
- [Ruby on Rails](https://guides.rubyonrails.org/v5.2/)
- [React.js](https://reactjs.org/docs/getting-started.html)
- [PostgreSQL](https://www.postgresql.org/docs/12/index.html)

### Getting started:
The setup steps expect the following tools/versions:
- Ruby 2.6.5
- Rails 5.2.4.2
- PostgreSQL 12

###### Checkout the repository
```
git clone https://github.com/ShruthiL/entree-picker.git
```

###### Create and setup the database
```
bundle exec rake db:setup
```

###### Run the test suite
```
bundle exec rspec
```

###### Start the Rails server and webpack-dev-server
```
bundle exec rails s
yarn run start
```
###### The application can be accessed via <http://localhost:3000>

### Features:

As a non-registered user, Entrée Picker will let the user know about the site and search trend for Entrée Picker. It allows the user to Switch Theme to explore the site.

A user can sign up to become a registered user. Once the user signs in, the site can suggest an entree based on the location or by selecting zipcode and price.

The user can track the search using the History page and can provide reviews for the entrée.

### Third Party Integrations
- Geolocation api
- US Restaurants Menu
- Google Maps api
- React-google-charts
- Google-analytics
- Devise
