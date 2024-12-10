### Hexlet tests and linter status:
[![Actions Status](https://github.com/ArinaAnderson/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/ArinaAnderson/frontend-project-12/actions)


# Chat

[Chat](https://frontend-project-12-xra6.onrender.com/) is a chat application that allows users to create accounts and exchange messages with friends in real time.
It is a fully functional project which is built with React.js and Redux Toolkit, utilizing Redux Toolkit Query and Axios for efficient networking and state management. The application is deployed on Render 
The application implements authentication using JWT (JSON Web Tokens), ensuring secure access and user data protection.

## Setup

```bash
make install
```

## Development

```bash
make develop
```


## i18n
Chat supports internationalization (using react-18next framework), allowing users to switch between languages.
Currently, the application offers two language options: Russian and English.

To add support for another language:
* Add your language's translation texts to the locales directory, following the existing key-value structure in the ru and en files.
* Add a language selection button to the header of the Chat application.

This feature makes the application adaptable to a global audience, ensuring accessibility across different languages.


## a11y

Chat is designed with inclusivity in mind, addressing key accessibility considerations to ensure a user-friendly experience for a diverse audience. Key features include:
* Keyboard Navigation: Full functionality is accessible via keyboard interactions.
* ARIA Labels and Screen Reader Support: Important elements are equipped with ARIA labels, and visually hidden content is available to assistive technologies.
* Contrast Compliance: background and font colors meet recommended contrast ratios for readability.
* Notifications and Error Messages: informative notifications and error messages enhance usability for all users.

These enhancements make the application accessible and welcoming to a broader range of users, including those relying on assistive technologies.

