![Logo](https://ownboon.com/_next/image?url=%2Flogo.png&w=48&q=74)


# OwnBoon Documentaation

The OwnBoon website is built with a mix of JSON Fetch API calls for frontend data and Sanity Database fetches ( serverless functions) for handling user data, blogs, notes, todos, chat, and many more.

### 1. Data Fetch APIs
## Serverless Functions ( Database Queries )
users
  ```py
    - pages/api/GetUsers.ts 
  ```
  fetches all the user and their data stored in the database. 
  initialization users code:
  ```js
index.tsx ( home page )

useEffect(() => {
    if (user) {
      if (isNewUser) {
        const seoslug = user?.username!.toLocaleLowerCase();
        const slugtype = {
          type: "slug",
          current: `${seoslug!.replace(/\s+/g, "-")}`,
        };
        const createUser = async () => {
          console.log("posting user");
          postUser(slugtype);
        };
        createUser();
      }
    } else null;
  }, [isNewUser]);
```

blogs

 ```ts
    - pages/api/getBlog.ts 
  ```
fetches all the blogs stored in database. blogs can be mutated ( posted into db serverlessly ) -> refer /api/addBlog

todos

 ```ts
    - pages/api/getGoals.ts 
  ```
fetches all the todos ( goals ) made by the user dynamically and stored in the sanity.js db
  

## API STRUCTURE
### Set api's
```js
/api/set - patch mutations ( not creating new documents but changing fields inside a document )
       example: setGoals.ts
```
### Get Api's
```js
/api/get - get request ( fetches all the data corresponding to that fetch )
       example: getUser.ts
```
### Post Api's
```js
/api/post - post mutations (  creating new documents  )
       example: addBlog.ts
```
### 2. Database Brief
  Ownboon runs on Sanity.js

  folder structure:
```
project
│   package.json   
│
└───schemas
│   │   category.ts
│   │   goals.ts
│   │   index.ts
│   │   post.ts ( blog )
│   │   notes.ts 
│   │   goals.ts ( todos )
│   │   roadmaps.ts
│   │   messages.ts
│   │   user.ts
│   │   habits.ts
│   │   feedComment.ts ( comment for posts i.e the instagram like posts on ownboon social page )
│   │
│   └───
│         
└───plugins
    │   not important
```
### 3. Page Differentiation

- <Home Page> -


    - The data of users  fetched via /api/getUsers using a handler function

- <workspace Page> -
    - users are being fetched from *getUsers.ts*, goals are also fetched by their respective helper functions. remeber i have used next-ui for temperory styling, frontend devs can use whatever they want. 
  

- <Dashboard Page> - 
    - similar to dashboard page, most code is not updated yet. page needs to be redesgined anyways.



- Roadmaps Page - 
    - fetches roadmaps using openai gpt 3.5 turbo 16k model. ( not received api keys yet )
    - various condtions for error handling is used
    - sorry for code being too weird, i was having short of time that time :(
## Tech Stack

**Client:** Nextjs, Sanity, TailwindCSS

**Server:** Nextjs (Server Side), Replit ( server codes: chat, openai )

**Design:** Figma

## Useful Links

[Figma]([https://www.figma.com/file/Oj9TF5DbYFn1kSjrRZaexS/CSYA-WEBSITE?type=design&node-id=0%3A1&mode=design&t=uiMDnOfJ6HK0Q2PE-1](https://www.figma.com/file/nkxgW83TADP2XyTtUG5zaS/Ownboon?mode=dev))

[Tailwind CSS ](https://tailwindcss.com/docs/installation)

[Nextjs ](https://nextjs.org/docs)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file and vercel.

`NEXT_PUBLIC_SANITY_DATASET=`
`NEXT_PUBLIC_SANITY_PROJECT_ID=`
`SANITY_API_TOKEN=`
`TRACING_ENABLED=false`
`NEXT_PUBLIC_SOCKET_URL="http://localhost:4000/"`
`NEXT_PUBLIC_SOCKETIO_URL_2=http://localhost:5000/`
`NEXT_PUBLIC_SHAZAM_CORE_RAPID_API_KEY=`
`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=`
`CLERK_SECRET_KEY=`
`NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
`NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`
`NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/`
`NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/`
`NEXT_PUBLIC_RAPID_API_KEY=`
`NEXT_PUBLIC_TINY=`
`NEXT_PUBLIC_CLIENT_SECRET=`
`NEXT_PUBLIC_CLIENT_ID=`
`NEXT_PUBLIC_OPENAI_KEY=`
`NEXT_PUBLIC_CHAT_KEY=8ef40a21-bcb4-47f3-928e-2b83389392b1`


## Deployment

To use dev testing on this project run

```bash
  npm run dev
```
