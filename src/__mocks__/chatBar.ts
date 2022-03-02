import firebase from 'firebase/app'

const dateConverted = new Date(1646169067 * 1000 + 936000000 / 1000000)

const dateConvertedToFIREBASE = firebase.firestore.Timestamp.fromDate(
  dateConverted
)

export const CHAT_BAR_MOCK = [
  {
    id: 'wkT92G2DfO9GE02zPIHH',
    name: '',
    createdAt: {
      seconds: 1645669080,
      nanoseconds: 710000000,
    },
    createdBy: 'gS7rEXTHrBSddOGBy6enKSE1Cmy1',
    type: 'private',
    members: [
      {
        displayName: 'aa',
        email: 'lematadorxbox@gmail.com',
        photoURL:
          'https://lh3.googleusercontent.com/a/AATXAJzBRmEUB2-yYSxGdis_88PPK5T2uYGfFUMYJwsHexQ=s96-c',
        uid: 'Rsx2lzodJZYtVUJSXsoDcQcFww73',
      },
      {
        photoURL:
          'https://lh3.googleusercontent.com/a/AATXAJxLhy7CK7ul62DpYkpwFj_UxkTQmngMwtEeesST=s96-c',
        uid: 'gS7rEXTHrBSddOGBy6enKSE1Cmy1',
        displayName: 'Victor Hugo Schneider de Almeida',
        email: 'victorhugoschneiderr@gmail.com',
      },
    ],
    recentMessage: {
      text: 'oi',
      sentBy: {
        displayName: 'Victor Hugo Schneider de Almeida',
        uid: 'gS7rEXTHrBSddOGBy6enKSE1Cmy1',
      },
      sentAt: dateConvertedToFIREBASE,
    },
  },
]
