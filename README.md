# Bookmarks manager

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and improved with [swc](https://swc.rs/).

## Available Scripts

In the project directory, you can run:

### `craco start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## Usage

This is a simple bookmark management application.

This one supports two types of links:

- Vimeo video (ex: https://vimeo.com/565486457)
- Flickr photo (ex: https://www.flickr.com/photos/feuilllu/45771361701/)

The view contains an add form and a list of bookmarks.

The add form has an input field for the link url and a submit button. When submitting the link, a call to the https://noembed.com/ API will be made to get the video or photo information.

<details>
  <summary>The following information will be displayed for a Vimeo link:</summary>

1. Video preview (if available)
2. URL
3. Title of the video
4. Author
5. Date added in the application (one hour ago, 2 minutes ago...)
6. Date published on Vimeo (November 3, 2020)
7. Duration (hh:mm:ss)
</details>

<details>
  <summary>The following information will be displayed for a Flickr link:</summary>

1. Photo preview
2. URL
3. Title of the photo
4. Author
5. Date added in the application (one hour ago, 2 minutes ago...)
6. Date published on Flickr (November 3, 2020) (_Note that I never see this prop for a flickr photo_)
7. Width x Height
</details>

A delete button will also be present for each link.

## Resources

[Ant Design](https://ant.design/docs/react/use-in-typescript).
[craco on medium](https://jwchang0206.medium.com/make-create-react-app-faster-with-rust-6c75ffa8fdfd).
[craco on npm](https://www.npmjs.com/package/@craco/craco).
[swc](https://swc.rs/)

