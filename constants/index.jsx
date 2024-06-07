import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';


export const dataList= [
    {
        id: 1,
        title: "Notifications",
        content: 15
    },
    {
        id: 2,
        title: "Orders",
        content: 25
    },
    {
        id: 3,
        title: "Order Complete",
        content: 15
    },
] 

export const OrderDetail= [
    {
        id: 1,
        table: "Table 1",
        totale: 15,
        status: "New"
    },
    {
        id: 2,
        table: "Table 2",
        totale: 15,
        status: "New"
    },
    {
        id: 3,
        table: "Table 3",
        totale: 15,
        status: "New"
    },
    {
        id: 4,
        table: "Table 4",
        totale: 15,
        status: "New"
    },
    {
        id: 5,
        table: "Table 5",
        totale: 15,
        status: "New"
    },
    {
        id: 6,
        table: "Table 6",
        totale: 15,
        status: "New"
    },
    {
        id: 7,
        table: "Table 7",
        totale: 15,
        status: "New"
    },
    {
        id: 8,
        table: "Table 8",
        totale: 15,
        status: "New"
    },
    {
        id: 9,
        table: "Table 9",
        totale: 15,
        status: "New"
    },
    {
        id: 10,
        table: "Table 10",
        totale: 15,
        status: "New"
    },


] 

export const DATA = [
    {
      id: 1,
      title: "Notification",
    },
    {
      id: 2,
      title: "Order",
    },
    {
      id: 2,
      title: "Order Complete",
    },
  ];

export const API_URL = "https://backend.garista.com"

export const categories = ['All', 'Category 1', 'Category 2', 'Category 3'];

export const data =  [
    { id: 1, category: 'Main course', name: 'Beef fillet', price: 18, quantity: 0, image: 'https://via.placeholder.com/80' },
    { id: 2, category: 'Main course', name: 'Penne mediterranean', price: 16, quantity: 0, image: 'https://via.placeholder.com/80' },
    { id: 3, category: 'Main course', name: 'Sea food mix', price: 22, quantity: 0, image: 'https://via.placeholder.com/80' },
    { id: 4, category: 'Main course', name: 'Grilled salmon', price: 21, quantity: 0, image: 'https://via.placeholder.com/80' },
    { id: 5, category: 'Starter', name: 'Beef fillet', price: 18, quantity: 0, image: 'https://via.placeholder.com/80' },
  ];

 export const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),
    /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
    error: (props) => (
      <ErrorToast
        {...props}
        text1Style={{
          fontSize: 17
        }}
        text2Style={{
          fontSize: 15
        }}
      />
    ),
    /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
    tomatoToast: ({ text1, props }) => (
      <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
        <Text>{text1}</Text>
        <Text>{props.uuid}</Text>
      </View>
    )
  };
  