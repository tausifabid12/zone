// import { Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
// import React, { useState } from 'react'
// import Navbar from '@/components/NavBar'
// import { Bars3CenterLeftIcon, Bars3Icon, ChevronDoubleRightIcon, ChevronDownIcon, ShoppingCartIcon } from 'react-native-heroicons/outline'
// import { useTheme } from '@/contexts/theme.provider';
// import Nav from './components/nav';
// import QuickDelivery from './components/quick-delivery';
// import SameDayDelivery from './components/same-day-delivery';
// import AllIndiaDelivery from './components/all-india-delivery';
// import BillSummery from './components/bill-summery';
// import Text from '@/components/ui/Text';
// import SelectAddressModal from './components/select-address-modal';
// import { ArrowDownIcon } from 'react-native-heroicons/solid';
// import { useCart } from '@/contexts/cart.context';
// import { router } from 'expo-router';



// export default function Cart() {

//   // ================== states
//   const [addressModalOpen, setAddressModalOpen] = useState(false)


//   // ========== hooks
//   const { themeColors } = useTheme()
//   const { addToCart, cart, updateQuantity } = useCart();









//   async function makePayment() {
//     // var options: any = {
//     //   description: 'Credits towards consultation',
//     //   image: 'https://i.imgur.com/3g7nmJC.jpg',
//     //   currency: 'INR',
//     //   key: 'rzp_test_nP4TSAPxnlADEz',
//     //   amount: '5000',
//     //   name: 'Acme Corp',
//     //   order_id: 'order_PvdGXrXYlw6Q4A',//Replace this with an order_id created using Orders API.
//     //   prefill: {
//     //     email: 'gaurav.kumar@example.com',
//     //     contact: '9191919191',
//     //     name: 'Gaurav Kumar'
//     //   },
//     //   theme: { color: themeColors.primary600 }
//     // }
//     // RazorpayCheckout.open(options).then((data) => {
//     //   // handle success
//     //   alert(`Success: ${data.razorpay_payment_id}`);
//     // }).catch((error) => {
//     //   // handle failure
//     //   alert(`Error: ${error.code} | ${error.description}`);
//     // });

//   }








//   // ============== render

//   return (
//     <>
//       <StatusBar
//         translucent
//         backgroundColor={themeColors.background}
//         barStyle="dark-content"
//       />
//       <ScrollView style={{
//         flex: 1,
//         backgroundColor: themeColors.neutral50
//       }} >

//         <Nav />

//         <ScrollView style={styles.container}>
//           {
//             cart?.find(item => item?.product?.deliveryOptions?.quick == true)?.product?.id ? <>   <QuickDelivery /></> : <></>
//           }
//           {
//             cart?.find(item => item?.product?.deliveryOptions?.sameDay == true)?.product?.id ? <>   <SameDayDelivery /></> : <></>
//           }
//           {/* {
//             cart?.find(item => item?.product?.deliveryOptions?.allIndia == true)?.product?.id ? <>   <AllIndiaDelivery /></> : <></>
//           } */}

//           {
//             cart?.length ? <BillSummery /> : <></>
//           }



//           <View style={{
//             paddingTop: 100
//           }}>

//           </View>





//         </ScrollView>
//         {/* ============================================ make payment ========== */}

//         <View style={{
//           backgroundColor: themeColors.background,
//           borderTopLeftRadius: 16,
//           borderTopRightRadius: 16,
//           paddingBottom: 50,
//           paddingHorizontal: 16,
//           paddingTop: 16,
//           // elevation:

//         }} >
//           <View style={{

//           }}>
//             {/*===================================================== Header Section */}
//             <TouchableOpacity
//               onPress={() => setAddressModalOpen(true)}

//               style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 gap: 8,
//                 marginBottom: 12
//               }}>

//               <Image
//                 source={require("../../assets/icons/cart/location.png")}

//                 style={{
//                   height: 40,
//                   width: 40
//                 }}
//               />
//               <View>
//                 <View style={{
//                   flexDirection: 'row',
//                   alignItems: 'center',
//                   gap: 3
//                 }}>
//                   <Text variant="caption-sm" style={{
//                     color: themeColors.neutral800
//                   }}>Deliver to Home </Text>
//                   <ChevronDownIcon color={themeColors.neutral800} size={18} />
//                 </View>

//                 <Text variant="body-sm" style={{
//                   color: themeColors.neutral500
//                 }}>No. 23, ABC Street, XYZ Area, Chennai,  </Text>
//               </View>

//               <View>

//               </View>




//             </TouchableOpacity>
//           </View>

//           <TouchableOpacity
//             // onPress={() => router.push('/order-success-screen')}
//             onPress={makePayment}
//             style={[{
//               backgroundColor: themeColors.primary600,

//               flexDirection: "row",
//               justifyContent: "space-between",
//               alignItems: "center",
//               borderBottomRightRadius: 12,
//               borderBottomLeftRadius: 12,
//               paddingVertical: 16,
//               paddingHorizontal: 20,
//               borderRadius: 14,


//             }]}>
//             <View style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               gap: 2
//             }}>
//               <Text variant="caption-md-prominent" style={{
//                 color: themeColors.primary50
//               }} >8 Items</Text>
//               <Text variant="body-md" style={{
//                 color: themeColors.primary50
//               }} > Selected</Text>
//             </View>

//             <View style={{
//               flexDirection: 'row',
//               alignItems: 'center',
//               gap: 4
//             }}>
//               <View style={{
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 gap: 2
//               }}>
//                 <Text variant="body-md" style={{
//                   color: themeColors.primary50
//                 }} > Pay</Text>
//                 <Text variant="caption-md-prominent" style={{
//                   color: themeColors.primary50
//                 }} >₹7620</Text>

//               </View>
//               <Text variant="body-xl" style={{
//                 color: themeColors.white,
//                 marginTop: 3
//               }}>
//                 {">"}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         </View>


//       </ScrollView>
//       {
//         addressModalOpen && <SelectAddressModal setModalVisible={setAddressModalOpen} isModalVisible={addressModalOpen} />
//       }

//     </>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 24,

//   }
// })