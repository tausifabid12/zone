import { FlatList, Image, Pressable, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useTheme } from '@/contexts/theme.provider';
import Text from '@/components/ui/Text';
import { useCart } from '@/contexts/cart.context';
import Nav from '../cart/components/nav';
import BillSummery from '../cart/components/bill-summery';
import QuickDelivery from '../cart/components/quick-delivery';
import SameDayDelivery from '../cart/components/same-day-delivery';
import { router, useFocusEffect } from 'expo-router';
import { useQuery } from '@/hooks/useQuery';
import { IOrder } from '@/shared/interfaces/order.interface';
import { useMutation } from '@/hooks/useMutation';
// import RazorpayCheckout from 'react-native-razorpay';
import SelectAddressModal from '@/components/select-address-modal';
import { useAuth } from '@/contexts/auth.context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AllIndiaDelivery from '../cart/components/all-india-delivery';
import SkeletonLoader from '@/components/shared/SkeletonLoader';
import { ICoupon } from '@/interfaces/cupon.interface';
import CouponCard from '../cart/components/cuponCard';


interface IOrderData {
  data: IOrder
}
interface ICuponData {
  data: ICoupon[]
}

export default function Cart() {





  // ================== states
  const [addressModalOpen, setAddressModalOpen] = useState(false)



  // ========== hooks 
  const { themeColors } = useTheme()
  const { addToCart, cart, updateQuantity, clearCart, address, totalItems, totalPrice } = useCart();
  // const { user } = useAuth();
  const { data: coupons, loading: couponsLoading, refetch } = useQuery<ICuponData>('coupons');
  const { data: paymentData, error, loading, mutate } = useMutation<IOrderData>();
  const { mutate: placeOrder } = useMutation<any>();

  async function getPaymentDetails(couponId: string | null = null) {
    const data: any = {
      notes: {
        // "paymentType": "cash-on-delivery"
      },
      customer_details: {
        shipping_address: {
          line1: "12, Anna Nagar Main Road",
          line2: "KK Nagar",
          city: "Chennai",
          state: "Tamil Nadu",
          country: "India",
          zipcode: "600078"
        },
        billing_address: {
          line1: "12, Anna Nagar Main Road",
          line2: "KK Nagar",
          city: "Chennai",
          state: "Tamil Nadu",
          country: "India",
          zipcode: "600078"
        }
      },
      products: cart?.map(item => ({
        quantity: 1,
        productId: item?.product?._id,
        variantId: item?.variant?._id,
        notes: {
          deliveryType: "quick"
        }
      }))
    };

    if (couponId) {
      data.couponIds = [couponId];
    }

    const response = await mutate('orders/validate', 'POST', data);

  }

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBackgroundColor(themeColors.white);
      StatusBar.setBarStyle('dark-content');
    }, [])
  );

  useEffect(() => {
    getPaymentDetails()
  }, [totalItems, cart])








  console.log(paymentData?.data?.paymentInfo?.revisedCost?.finalAmount, '}}}}}}}}}}}}}}}}}}}}}}}}}')








  const handleMakePayment = async (

  ): Promise<any> => {


    // const orderDetails = await placeOrder(`orders/${paymentData?.data?._id}`, 'PUT',
    //   {
    //     "paymentType": "online" // online | cash-on-delivery
    //   }
    // );
    // const orderId = orderDetails?.data?.razorpayOrderId
    // const userData: any = await AsyncStorage.getItem('userData')
    // const us = JSON.parse(userData)

    // const paymentOptions: any = {
    //   description: "Credits towards consultation",
    //   image: "https://www.shutterstock.com/image-vector/zone-letter-original-monogram-logo-260nw-1680065590.jpg",
    //   currency: "INR",
    //   // key: "rzp_test_juxG7GwSlx3ANg",
    //   key: "rzp_test_nP4TSAPxnlADEz",
    //   amount: `${paymentData?.data?.paymentInfo?.revisedCost?.finalAmount}`,
    //   name: 'Zone',
    //   order_id: orderId,
    //   prefill: {
    //     email: us?.email,
    //     contact: us?.phoneNumber?.number,
    //     name: us?.fullName?.firstName,
    //   },
    //   theme: { color: themeColors.primary600 },
    // };


    // if (RazorpayCheckout?.open) {
    //   return new Promise((resolve, reject) => {
    //     RazorpayCheckout.open(paymentOptions)
    //       .then(data => {
    //         console.log(`Payment Success: ${data}`);
    //         console.log(`Payment Success: ${data?.razorpay_signature}`);
    //         console.log(`Payment Success: ${data?.razorpay_order_id}`);
    //         console.log(`Payment Success: ${data?.razorpay_payment_id}`);
    //         resolve(data);
    //         clearCart()
    //         router.push('/order-list-screen')
    //       })
    //       .catch(error => {
    //         console.error(`Payment Error: ${error} | ${error.description}`);
    //         reject(error);
    //       });
    //   });
    // }

  };

  // ============== render

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={themeColors.background}
        barStyle="dark-content"
      />
      <View style={{
        flex: 1,
        backgroundColor: themeColors.neutral50
      }} >

        <Nav paymentData={paymentData?.data} />

        <ScrollView style={styles.container}>
          {
            cart?.find(item => item?.deliveryOptions == "quick")?.product?._id ? <>   <QuickDelivery /></> : <></>
          }
          {
            cart?.find(item => item?.deliveryOptions == "sameDay")?.product?._id ? <>   <SameDayDelivery /></> : <></>
          }
          {
            cart?.find(item => item?.deliveryOptions == "allIndia")?.product?._id ? <>   <AllIndiaDelivery /></> : <></>
          }


          {
            !cart.length && <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: 600
            }}>
              <Text variant='title-md' style={{
                color: themeColors.neutral400,
                textAlign: 'center'
              }}>
                Ouch, nothing in cart  ˙◠˙
              </Text>

              <Pressable

                onPress={() => router.push('/product-search-screen')}
                style={{
                  backgroundColor: themeColors.background,
                  borderWidth: 2,
                  borderColor: themeColors.primary600,
                  borderRadius: 16,
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  marginTop: 12
                }}>
                <Text variant='caption-md' style={{
                  color: themeColors.primary600,
                  textAlign: 'center'
                }}>
                  Browse Products
                </Text>
              </Pressable>

            </View>
          }




          {
            cart.length ? <>

              {
                couponsLoading ? <>
                  <SkeletonLoader width={'100%'} height={70} borderRadius={10} />
                </> :
                  <>
                    {
                      coupons?.data?.length ? <>
                        <View style={{ marginTop: 16 }}>
                          <Text style={{ marginBottom: 10 }} variant="caption-sm-prominent">Coupons</Text>

                          {/* Use FlatList for horizontal scrolling */}
                          <FlatList
                            data={coupons?.data}
                            renderItem={({ item }) => (
                              <CouponCard coupon={item} getPaymentDetails={getPaymentDetails} />
                            )}
                            keyExtractor={(item, index) => index.toString()}  // Use a unique key for each item
                            horizontal
                            showsHorizontalScrollIndicator={false}  // Optional: hides the horizontal scroll indicator
                          />

                        </View>
                      </> : <></>
                    }
                  </>
              }

              {
                loading ? <>
                  <SkeletonLoader width={'100%'} height={70} borderRadius={10} />
                </> :

                  <>

                    {
                      paymentData ? <BillSummery paymentData={paymentData?.data} /> : <></>
                    }
                  </>
              }


            </> : <></>
          }



          <View style={{
            paddingTop: 100
          }}>

          </View>






        </ScrollView>
        {/* ============================================ make payment ========== */}

        {
          paymentData && cart.length ? <>
            <View style={{
              backgroundColor: themeColors.background,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              paddingHorizontal: 16,
              paddingTop: 16,
              marginBottom: 16
              // elevation:

            }} >
              <View style={{

              }}>
                {/*===================================================== Header Section */}
                <TouchableOpacity
                  onPress={() => setAddressModalOpen(true)}

                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 12
                  }}>

                  <Image
                    source={require("../../assets/icons/cart/location.png")}

                    style={{
                      height: 40,
                      width: 40
                    }}
                  />
                  <View>
                    <View style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3
                    }}>
                      <Text variant="caption-sm" style={{
                        color: themeColors.neutral800
                      }}>Deliver to </Text>
                      {/* <ChevronDownIcon color={themeColors.neutral800} size={18} /> */}
                    </View>

                    <Text variant="body-sm" style={{
                      color: themeColors.neutral500
                    }}>{address?.line1}  </Text>
                  </View>

                  <View>

                  </View>




                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleMakePayment}
                // onPress={() => router.push('/order-success-screen')}
                style={[{
                  backgroundColor: themeColors.primary600,

                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomRightRadius: 12,
                  borderBottomLeftRadius: 12,
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                  borderRadius: 14,


                }]}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 2
                }}>
                  <Text variant="caption-md-prominent" style={{
                    color: themeColors.primary50
                  }} >{totalItems} Items</Text>
                  <Text variant="body-md" style={{
                    color: themeColors.primary50
                  }} > Selected</Text>
                </View>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4
                }}>
                  <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 2
                  }}>
                    <Text variant="body-md" style={{
                      color: themeColors.primary50
                    }} > Pay</Text>
                    <Text variant="caption-md-prominent" style={{
                      color: themeColors.primary50
                    }} >

                      ₹{paymentData?.data?.paymentInfo?.revisedCost?.finalAmount / 100}

                      {/* {totalPrice} */}
                    </Text>

                  </View>
                  <Text variant="body-xl" style={{
                    color: themeColors.white,
                    marginTop: 3
                  }}>
                    {">"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </> : <></>
        }


        {
          addressModalOpen ? <>
            <SelectAddressModal setModalVisible={setAddressModalOpen} isModalVisible={addressModalOpen} /></> : <></>
        }
      </View>

    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,

  }
})