const en = {
  translation: {
    form: {
      login: {
        buttons: {
          signIn: 'Sign in',
        },
        headline: 'Sign In',
        labels: {
          username: 'Username',
          password: 'Password',
        },
        footerText: 'New to Hexlet Chat?',
        footerLink: 'Create account',
        errors: {
          wrongCredentials: 'Wrong password or username',
        },
      },

      signup: {
        buttons: {
          signup: 'Sign up',
        },
        headline: 'Join Hexlet Chat',
        labels: {
          username: 'Username',
          password: 'Password',
          confirmPassword: 'Confirm Password',
        },
        footerText: 'Already have an account?',
        footerLink: 'Login',
        errors: {
          validation: {
            userNameLength: 'Username must be between 3 and 20 characters long',
            passwordLength: 'Password is too short. Please enter at least 6 characters',
            required: 'This field cannot be left blank',
            passwordMatch: 'Passwords must match',
          },
          err409: 'This name already exists. Try another name',
        },
      },

      newMessage: {
        label: 'New message',
        placeholder: 'New message',
        submit: 'Send',
      },
    },

    errors: {
      noNetwork: 'Network error: Could not connect.',
      // 505
    },

    header: {
      buttons: {
        signout: 'Sign out',
        languages: {
          ru: 'Translate to Russian',
          en: 'Translate to English',
        },
      }
    },

    channelWindow: {
      messagesCount: {
        count_one: '{{count}} message',
        count_other: '{{count}} messages',
      },
    },

    channelsList: {
      headline: 'Channels',
      addChannelBtn: 'Add channel',
      toggleChannelsList: {
        hide: 'Hide all channels',
        show: 'Show all channels',
      },
      channelDropDown: {
        toggle: 'Channel management',
        rename: 'Rename',
        remove: 'Remove',
      },
      modals: {
        addChannel: {
          headline: 'Add channel',
          label: 'Channel name',
        },
        renameChannel: {
          headline: 'Rename channel',
          label: 'Channel name',
        },
        removeChannel: {
          headline: 'Remove channel',
          text: 'Are you sure?',
          submit: 'Delete',
        },
        buttons: {
          cancel: 'Cancel',
          submit: 'Send',
        },
        validationErrors: {
          channelNameLength: 'Channel name must be between 3 and 20 characters long',
          unique: 'Such name already exists',
          required: 'This field cannot be left blank',
        },
      },
    },
  },

  
};

export default en;
