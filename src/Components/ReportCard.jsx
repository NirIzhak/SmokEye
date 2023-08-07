import { View, Text, Image, TouchableOpacity, StyleSheet, Button, Modal } from 'react-native'
import { useContext } from 'react'
import { SmokeyeContext } from '../Context/SmokEyeContext';
import { APIContext } from '../Context/APIContext';
import { Popstyles } from '../style/PopUpModal';
import { Svg } from 'react-native-svg';


export default function ReportCard({ _id, date, type, address, place, details, image, navigation }) {
  const { createReport } = useContext(SmokeyeContext);
  const { DeleteReport, setpopMsgDelete, popMsgDelete } = useContext(APIContext);
  let a = address[0].street + " " + address[0].streetNum + " " + address[0].city;
  const dateArr = date.split(" ");
  const hidePopupModal = () => {
    setpopMsgDelete(false);
  }
  const deleteReport = () => {
    DeleteReport(_id);
  }
  return (
    <View style={styles.continer}>
      <View style={styles.text_continer}>
        <View style={styles.contentContiner}>
          <View>
            <TouchableOpacity onPress={deleteReport}>
              <Image source={require("../Images/icons8-trash-50.png")} style={{ width: 20, height: 20 }}></Image>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.text_field}>
              <Text style={styles.text_bold}>תאריך : </Text>
              <Text>{dateArr[0]}</Text>
            </Text>
            <Text>
              <Text style={styles.text_bold}>עסק / המרחב ציבורי : </Text>
              <Text>{type == "Private" ? "ציבורי" : "עסק"}</Text>
            </Text>
            <Text>
              <Text style={styles.text_bold}>תיאור : </Text>
              <Text>{details}</Text>
            </Text>
            <Text style={styles.text_field}>
              <Text style={styles.text_bold}>כתובת : </Text>
              <Text>{a}</Text>
            </Text>
            <Text style={styles.text_field}>
              <Text style={styles.text_bold}>מיקום : </Text>
              <Text>{place}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.btn}>
          <Button
            title='פרטים מלאים'
            color='#F39508'
            onPress={() => {
              createReport(date, type, address, place, details, image);
              navigation.navigate('fullReport')
            }}
          >
          </Button >
        </View>
        {
          popMsgDelete ?
            <>
              <View>
                <Modal
                  visible={popMsgDelete}
                  animationType="fade"
                  transparent={true}
                  onRequestClose={hidePopupModal}
                >
                  <View style={Popstyles.modalContainer}>
                    <View style={Popstyles.modalContent}>
                      <Text style={Popstyles.messageText}>דיווח נמחק בהצלחה !</Text>
                      <View style={{ alignItems: 'center' }}>
                        <Image source={{ uri: "https://cdn-icons-png.flaticon.com/512/1102/1102355.png?w=740&t=st=1690886025~exp=1690886625~hmac=5516a06b0266fe418d8604dcc0fc5935f96153877b94db73796af0874f383cd5" }} style={{
                          height: 180,
                          width: 180,
                        }}></Image>
                      </View>
                      <TouchableOpacity onPress={hidePopupModal}>
                        <Text style={Popstyles.closeButton}>סגור</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </Modal>
              </View>
            </>
            :
            null
        }
      </View>
    </View>

  )
}
const styles = StyleSheet.create({
  continer: {
    direction: 'rtl',
    borderColor: '#D9D9D9',
    borderWidth: 2,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  text_bold: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text_continer: {
    gap: 2,
    margin: 10,
    textAlign: 'center'
  },
  text_field: {
    fontSize: 15,

  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 2,
    width: 350,
    marginHorizontal: 5
  },
  contentContiner: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexDirection: 'row',
  },

})
