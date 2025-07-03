import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
//@ts-ignore
import CheckBox from 'react-native-check-box';
//@ts-ignore
import {Table, Row, Rows} from 'react-native-table-component';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import {
  horizontalScale,
  verticalScale,
  moderateScale,
} from '../../utilies/utilies';
import useDashboardHook from './dashboard.hook';

const Home = ({navigation}) => {
  const RenderTotalBill = () => {
    const {
      showTable,
      setShowTable,
      total,
      setTotal,
      motor,
      setMotor,
      per,
      setPer,
      handleTotalUnit,
      handleTotalBill,
    } = useDashboardHook();
    return (
      <View style={{borderWidth: 1, borderRadius: 10, padding: 10}}>
        <View style={styles.totalRow}>
          <Text style={styles.totalBillUnit}>Total Bill :</Text>
          <TextInput
            style={styles.totalBillInput}
            defaultValue={total.bill.toString() || ''}
            placeholder="Total Bill"
            keyboardType="numeric"
            onChangeText={value => handleTotalBill(value)}
          />
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalBillUnit}>Total Unit :</Text>
          <TextInput
            style={styles.totalBillInput}
            defaultValue={total.unit.toString() || ''}
            placeholder="Total Unit"
            keyboardType="numeric"
            onChangeText={value => handleTotalUnit(value)}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'light-content'} backgroundColor={'white'} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic">
        <Text style={[styles.headerCenter]}>Bill Calculation</Text>

        <Text style={styles.headerTitle}>Total Bill & Unit</Text>
        <RenderTotalBill />
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 0.8}}>
            <Text style={styles.headerTitle}>Unit</Text>
          </View>
          <View style={{flex: 0.3, justifyContent: 'center'}}>
            <CheckBox
              //   onClick={() => {
              //     setFirstInclude(!firstInclude)
              //   }}
              isChecked={true}
              leftText={'First Floor'}
              leftTextStyle={styles.checkIcon}
            />
          </View>
        </View>
        {/* <RenderTotal /> */}
        <Text style={styles.headerTitle}>Drinking Water</Text>
        {/* <DrinkingContainer />
        <View style={{ alignItems: "center", flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => handleCaluclated()}>
            <Text style={{ color: "white" }}>Calculate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => handleClear()}>
            <Text style={{ color: "white" }}>Clear</Text>
          </TouchableOpacity>
        </View>
        <CheckBox
          onClick={() => {
            setShowFirst(!showFirst)
          }}
          isChecked={showFirst}
          leftText={"Show First Floor"}
          leftTextStyle={styles.checkIcon}
        />
        {showTable && (
          <>
            <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
              <Row data={['', 'Unit used', 'TotalUnit', 'Total Bill', 'Drinking Pay', `Total Pay`]} style={styles.head} textStyle={styles.text} />
              <Rows data={[
                ['Third', `${third.perviousUnit - third.currentUnit}`, `${third.totalUnit.toFixed(2)}`, `${third.totalAmount}`, `${third.otherFlag === 0 ? '+' : third.otherFlag === 1 ? '-' : ''} ${third.otherAmount.toFixed(2)}`, `${third.totalAmountDrink.toFixed(2)}`],
                ['Second', `${second.perviousUnit - second.currentUnit}`, `${second.totalUnit.toFixed(2)}`, `${second.totalAmount}`, `${second.otherFlag === 0 ? '+' : second.otherFlag === 1 ? '-' : ''} ${second.otherAmount.toFixed(2)}`, `${second.totalAmountDrink.toFixed(2)}`],
                showFirst && ['First', ``, `${handleFirstCalculate().unitUsed}`, `${handleFirstCalculate().totalBill}`, `${((third.otherAmount - second.otherAmount).toFixed(2))}`, `${handleFirstCalculate().totalBillAmount}`],
              ]} textStyle={styles.text} />
              <Row data={[``, `Motor Unit: ${per.motor}`]} style={styles.head} textStyle={styles.text} />
              <Row data={[``, `Per Unit : ${per.unit}`]} style={styles.head} textStyle={styles.text} />
              <Row data={[``, `TotalBill : ${Math.floor(Number(handleFirstCalculate().totalBillAmount)) + Math.floor(second.totalAmountDrink) + Math.floor(third.totalAmountDrink)}`]} style={styles.head} textStyle={styles.text} />
            </Table>
            <TouchableOpacity style={styles.pdfContainer} onPress={() => navigation.navigate('Bill')}>
              <Text style={{ color: "white" }}>PDF</Text>
            </TouchableOpacity>
          </>
        )} */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    backgroundColor: '#ffffff',
  },
  headerCenter: {
    fontSize: moderateScale(20),
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: 'black',
    marginVertical: verticalScale(10),
  },
  headerTitle: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: 'black',
    marginVertical: verticalScale(10),
  },
  titleRow: {
    flex: 0.3,
    alignSelf: 'center',
    fontSize: moderateScale(12),
    fontWeight: 'normal',
    color: 'black',
  },
  errorRow: {
    flex: 0.3,
    alignSelf: 'center',
    fontSize: moderateScale(12),
    fontWeight: 'normal',
    color: 'red',
  },
  totalRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: verticalScale(5),
  },
  totalContainer: {
    height: verticalScale(40),
    borderWidth: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    flex: 0.4,
  },
  mR5: {
    marginRight: horizontalScale(5),
  },
  checkPlusContainer: {
    height: verticalScale(40),
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    flex: 0.4,
  },
  checkIcon: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: 'black',
  },
  totalBillUnit: {
    flex: 0.2,
    alignSelf: 'center',
    fontSize: moderateScale(12),
    fontWeight: 'normal',
    color: 'black',
  },
  totalBillInput: {
    height: verticalScale(40),
    borderWidth: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    flex: 0.8,
    marginLeft: horizontalScale(20),
  },
  buttonContainer: {
    marginVertical: verticalScale(20),
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(20),
    width: horizontalScale(150),
  },
  pdfContainer: {
    marginVertical: verticalScale(20),
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(20),
  },
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6, color: 'black'},
});

export default Home;
