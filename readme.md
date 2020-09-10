# 🐙 La grande noia

> **Invite your friends to events**

The first result I got when using the API behind this app was 'Give your pet 10 minutes of attention'. Now since I lack a real pet, I expanded those 10 mins and gave the attention to the internet. I was curious on trying out Spectre.css and ended up with an application I could use as my crystal ball when looking for activities to kill some time. I've also included a backend Email sending service that might come in handy some time.

The features of the app are quite straightforward

- Clicking the search button returns a random activity from the [Bored API](https://www.boredapi.com/)
- It visualizes how many people can join in, how much money and effort it costs
- Clicking the share button allows you to send a mail to other people ( this is disabled in the demo )

## Demo 

https://la-grande-noia.herokuapp.com/

## Project setup ( Development )

If you run it on your own environment, you need to have the [Vue CLI](https://cli.vuejs.org/) installed globally.

```
$ npm i -g @vue/cli
```

To run this app, you need to download the source code of the Vue frontend and this repos and install the necessary dependencies

```
git clone https://github.com/EarthenLynx/le-petite-noia
cd le-petite-noia
npm i
cd ..
git clone https://github.com/EarthenLynx/la-grande-noia
cd la-grande-noia
npm i
```

In order to send mails in a productive environment, you will need to configure a few variables in the webapp, as well as serverside

## Frontend configuration

> ./src/components/Invite.vue, within the function sendInvites, change the URL to the backend service that's to be targetted. The route that's hit by default is /sendmail

## Backend Configuration

> The backend uses an express MVC setup and the [dotenv package](https://www.npmjs.com/package/dotenv) to handle configuration variables. In there, you need to add the following: 

> SMTP_ADRESS=[The SMTP adress of your email provider]
> PORT=[The smtp's server port]
> USER=[Email adress or username of the email server]
> PASS=[Password of the email server]
> ENVIRONMENT=[Environment node runs on. Should be development for local setups]
