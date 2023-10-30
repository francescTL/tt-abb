## Readme Technical Test ABB AMR

This is the Technical Test of Francesc Torrens for the Frontend position on ASTI (ABB). The project uses the latest version of Angular and Ionic.
I have developed this project upon the base boilerplate of Ionic cli.

The important code is on ./src/app/home.
### Technical aspects

- Since it is a simple page, I have developed a standalone component with all the necessary imports and logic included
- This component is lazy-loaded in the route configuration as the only path of the project. Since many projects need to route the user somewhere else, I've kept the routing
- The layout is done with the ion-container, ion-grid, ion-row, ion-col and ion-card.
- The component form uses the ion-select with a formControl to get and edit the dropdown value.
- The selected label in the template is retrieved using a signal that is updated whenever the formControl changes.
- Includes translation of all texts shown inside the folder assets/i18n.
- There are 4 unit tests: one to test the default values and the others to test the label parse function.

### Design aspects

- The style and template files of the home page adhere to the BEM naming convention.
- The view is designed to meet the specified design requirements for a resolution of 1920*1080. Additionally, it incorporates responsive behavior for the position and size of the background image, card, and select elements.
- The majority of CSS rules customize the shadow DOM with the element style properties defined by Ionic.
- All the icons are included via CSS by changing the content of some parts of the select component.
- I have used SCSS variables to store the colors and sizes of the requirements, among others.

### View Requirements (of pdf)

- On the first view, the select is not focused.
- The first option of the dropdown is selected by default.
- The value of the selected option at that moment should appear on the 'Selected:' text.
- On the second view, the select is focused and opened.
- When the dropdown is opened, the style should change to match the view.
- The dropdown options should be styled within the component to match the second view.
- The currently selected option in the dropdown, when opened, should appear with a blue background and a check icon.

### How to's

- Install: npm install
- Serve project: npm start
- Build npm build
