# NoteKeeper

NoteKeeper is a simple, open-source note and list keeping application, inspired by Google Keep. Built with Vuetify, backed by SupaBase, and designed to be deployed to Vercel, NoteKeeper  


## Preparation

Set up your project using your preferred package manager. Use the corresponding command to install the dependencies:

```bash
npm install
```

## Setting up Supabase
Create a new project at [SupaBase](http://supabase.com). From the SQL editor, run the script found at `src/scripts/supabase_init.sql`.

Then, under Project Settings, note down the Project URL and the API key below it.

## Running the Application
Create a `.env.local` file in the project root, and add the following variables:

```
VITE_SUPABASE_URL="<url>"
VITE_SUPABASE_API_KEY="<key>"
```

### Starting the Development Server

To start the development server with hot-reload, run the following command. The server will be accessible at [http://localhost:3000](http://localhost:3000)
```bash
npm run dev
```

### Building for Production

To build the project, use:

```bash
npm run build
```

## 💪 Support Notekeeper Development

This project is a labor of love by [Ben Dunphy](https://github.com/gonfalon). If you would like to support this projet, feel free to buy me a coffe below.

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/N4N0SOHAD)

## 📑 License
[MIT](http://opensource.org/licenses/MIT)