import React, { useState } from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { horizontalScale, verticalScale, moderateScale } from '../../utilies/utilies';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
//@ts-ignore
import CheckBox from 'react-native-check-box';
//@ts-ignore
import { Table, Row, Rows } from 'react-native-table-component';

const data = [
  { label: 'Item 1', value: '1' },
  { label: 'Item 2', value: '2' },
  { label: 'Item 3', value: '3' },
  { label: 'Item 4', value: '4' },
  { label: 'Item 5', value: '5' },
  { label: 'Item 6', value: '6' },
  { label: 'Item 7', value: '7' },
  { label: 'Item 8', value: '8' },
];


function Home(): JSX.Element {
  const [showTable, setShowTable] = useState(false);
  const [firstInclude, setFirstInclude] = useState(true);
  const [showFirst, setShowFirst] = useState(false);
  const [total, setTotal] = useState({
    bill: 0,
    unit: 0
  });
  const [motor, setMotor] = useState({
    perviousUnit: 0,
    currentUnit: 0
  });
  const [third, setThird] = useState({
    perviousUnit: 0,
    currentUnit: 0,
    otherAmount: 0,
    otherFlag: 0,
    unitUsed: 0,
    totalUnit: 0,
    totalAmount: 0,
    totalAmountDrink: 0,
  });
  const [second, setSecond] = useState({
    perviousUnit: 0,
    currentUnit: 0,
    otherAmount: 0,
    otherFlag: 1,
    unitUsed: 0,
    totalUnit: 0,
    totalAmount: 0,
    totalAmountDrink: 0,
  });
  const [per, setPer] = useState({
    unit: 0,
    motor: 0,
  });
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: '#fffffff',
  };

  const handleAddSub = (value: number, other: number, flag: number) => {
    if (flag === 0) {
      return value + other
    }
    if (flag === 1) {
      return value - other
    }
  }

  const handleCaluclated = () => {
    let perMotor = firstInclude ? 1 : 0;
    const perUnit = total.bill / total.unit;
    const thirdDiffUnit = third.perviousUnit - third.currentUnit;
    const secondDiffUnit = second.perviousUnit - second.currentUnit;
    const motorDiffUnit = motor.perviousUnit - motor.currentUnit;
    console.log("perMotor", secondDiffUnit, (motorDiffUnit / perMotor), Number(secondDiffUnit + (motorDiffUnit / perMotor).toFixed(2)));
    if (thirdDiffUnit > 0) {
      perMotor = perMotor + 1
    }
    if (secondDiffUnit > 0) {
      perMotor = perMotor + 1
    }
    const totalAmountThird = thirdDiffUnit > 0 ? ((thirdDiffUnit + (motorDiffUnit / perMotor)) * perUnit) : 0;
    const totalAmountSecond = secondDiffUnit > 0 ? ((secondDiffUnit + (motorDiffUnit / perMotor)) * perUnit) : 0;
    setPer(setPer => ({
      ...setPer,
      unit: Number(perUnit.toFixed(2)),
      motor: Number((motorDiffUnit / perMotor).toFixed(2)),
    }))
    setThird(setFinal => ({
      ...setFinal,
      unitUsed: Number(thirdDiffUnit.toFixed(2)),
      totalUnit: thirdDiffUnit > 0 ? Number((thirdDiffUnit + (motorDiffUnit / perMotor))) : 0,
      totalAmount: Number(totalAmountThird.toFixed(2)),
      totalAmountDrink: Number(handleAddSub(totalAmountThird, third.otherAmount, third.otherFlag)),
    }))
    setSecond(setFinal => ({
      ...setFinal,
      unitUsed: Number(secondDiffUnit.toFixed(2)),
      totalUnit: secondDiffUnit > 0 ? Number((secondDiffUnit + (motorDiffUnit / perMotor))) : 0,
      totalAmount: Number(totalAmountSecond.toFixed(2)),
      totalAmountDrink: Number(handleAddSub(totalAmountSecond, second.otherAmount, second.otherFlag)),
    }))
    setShowTable(true)
  }

  const handleClear = () => {
    setShowTable(false)
    setTotal({
      bill: 0,
      unit: 0
    });
    setMotor({
      perviousUnit: 0,
      currentUnit: 0
    });
    setThird({
      perviousUnit: 0,
      currentUnit: 0,
      otherAmount: 0,
      otherFlag: 0,
      unitUsed: 0,
      totalUnit: 0,
      totalAmount: 0,
      totalAmountDrink: 0,
    });
    setSecond({
      perviousUnit: 0,
      currentUnit: 0,
      otherAmount: 0,
      otherFlag: 1,
      unitUsed: 0,
      totalUnit: 0,
      totalAmount: 0,
      totalAmountDrink: 0,
    });
    setPer({
      unit: 0,
      motor: 0,
    })
  }

  const handleFirstCalculate = () => {
    console.log("third", third);
    console.log("second", second);
    const unitUsed = total.unit - (third.totalUnit + second.totalUnit);
    const totalBill = unitUsed * per.unit;
    const totalBillAmount = total.bill - (Number(third.totalAmountDrink.toFixed(2)) + Number(second.totalAmountDrink.toFixed(2)));
    return {
      unitUsed: Number(unitUsed).toFixed(2),
      totalBill: Number(totalBill).toFixed(2),
      totalBillAmount: Number(totalBillAmount).toFixed(2)
    }
    // const drinking = 
  }

  const stringNullText = (value: number) => {
    // if(value === 0){
    //   return ''
    // }
    return (String(value))
  }
  const RenderTotalBill = () => {
    var value = ''
    return (
      <View style={{ borderWidth: 1, borderRadius: 10, padding: 10 }}>
        <View style={styles.totalRow}>
          <Text style={styles.totalBillUnit}>Total Bill :</Text>
          <TextInput style={styles.totalBillInput}
            defaultValue={stringNullText(total.bill)}
            placeholder='Total Bill'
            keyboardType='numeric'
            onChangeText={(val) => value = val}
            onEndEditing={() => {
              setTotal(settotal => ({
                ...settotal,
                bill: Number(value),
              }))
              value = ''
            }}
          />
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalBillUnit}>Total Unit :</Text>
          <TextInput style={styles.totalBillInput}
            defaultValue={stringNullText(total.unit)}
            placeholder='Total Unit'
            keyboardType='numeric'
            onChangeText={(val) => value = val}
            onEndEditing={() => {
              setTotal(settotal => ({
                ...settotal,
                unit: Number(value),
              }))
              value = ''
            }}
          />
        </View>
      </View>
    )
  }
  const RenderTotal = () => {
    var value = ''
    return (
      <View style={{ borderWidth: 1, borderRadius: 10, padding: 10 }}>
        <View style={styles.totalRow}>
          <Text style={styles.titleRow}>Third Floor :</Text>
          <TextInput style={[styles.totalContainer, styles.mR5]}
            defaultValue={stringNullText(third.perviousUnit)}
            placeholder='Pervious Unit'
            keyboardType='numeric'
            onChangeText={(val) => value = val}
            onEndEditing={() => {
              console.log("value", value);
              setThird(settotal => ({
                ...settotal,
                perviousUnit: Number(value),
              }))
              value = ''
            }}
          />
          <TextInput style={styles.totalContainer}
            defaultValue={stringNullText(third.currentUnit)}
            placeholder='Current Unit'
            keyboardType='numeric'
            onChangeText={(val) => value = val}
            onEndEditing={() => {
              setThird(settotal => ({
                ...settotal,
                currentUnit: Number(value),
              }))
              value = ''
            }}
          />
        </View>
        {third.perviousUnit < third.currentUnit &&
          <Text style={styles.errorRow}>Pervious Unit greather than Current Unit on Third floor</Text>
        }
        <View style={styles.totalRow}>
          <Text style={styles.titleRow}>Second Floor :</Text>
          <TextInput style={[styles.totalContainer, styles.mR5]}
            defaultValue={stringNullText(second.perviousUnit)}
            placeholder='Pervious Unit'
            keyboardType='numeric'
            onChangeText={(val) => value = val}
            onEndEditing={() => {
              setSecond(settotal => ({
                ...settotal,
                perviousUnit: Number(value),
              }))
              value = ''
            }}
          />
          <TextInput style={styles.totalContainer}
            defaultValue={stringNullText(second.currentUnit)}
            placeholder='Current Unit'
            keyboardType='numeric'
            onChangeText={(val) => value = val}
            onEndEditing={() => {
              setSecond(settotal => ({
                ...settotal,
                currentUnit: Number(value),
              }))
              value = ''
            }}
          />
        </View>
        {second.perviousUnit < second.currentUnit &&
          <Text style={styles.errorRow}>Pervious Unit greather than Current Unit on Second floor</Text>
        }
        <View style={styles.totalRow}>
          <Text style={styles.titleRow}>Motor Unit:</Text>
          <TextInput style={[styles.totalContainer, styles.mR5]}
            defaultValue={stringNullText(motor.perviousUnit)}
            placeholder='Pervious Unit'
            keyboardType='numeric'
            onChangeText={(val) => value = val}
            onEndEditing={() => {
              setMotor(settotal => ({
                ...settotal,
                perviousUnit: Number(value),
              }))
              value = ''
            }}
          />
          <TextInput style={styles.totalContainer}
            defaultValue={stringNullText(motor.currentUnit)}
            placeholder='Current Unit'
            keyboardType='numeric'
            onChangeText={(val) => value = val}
            onEndEditing={() => {
              setMotor(settotal => ({
                ...settotal,
                currentUnit: Number(value),
              }))
              value = ''
            }}
          />
        </View>
        <View>
          {motor.perviousUnit < motor.currentUnit &&
            <Text style={styles.errorRow}>Pervious Unit greather than Current Unit on Motor floor</Text>
          }
        </View>
        {/* <View style={styles.totalRow}>
          <Text style={{flex: 0.3}}>Motor Unit:</Text>
          <View style={{flex:0.9}}>
          <Dropdown
              placeholder="Select Motor divided by"
              labelField="label"
              valueField="value"
              data={data}
              onChange={item => {
  
              }}
            />
          </View>
       
        </View> */}
      </View>
    )
  }

  const DrinkingContainer = () => {
    var value = '';
    return (
      <View style={{ borderWidth: 1, borderRadius: 10, padding: 10 }}>
        <View style={styles.totalRow}>
          <Text style={styles.titleRow}>Third Floor :</Text>
          <View style={styles.checkPlusContainer}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <CheckBox
                style={{ flex: 1 }}
                onClick={() => {
                  setThird(ev => ({
                    ...ev,
                    otherFlag: 0,
                  }))
                }}
                isChecked={third.otherFlag === 0}

                rightText={"+"}
                rightTextStyle={styles.checkIcon}
              />
              <CheckBox
                style={{ flex: 1 }}
                onClick={() => {
                  setThird(ev => ({
                    ...ev,
                    otherFlag: 1,
                  }))
                }}
                isChecked={third.otherFlag === 1}
                rightText={"-"}
                rightTextStyle={styles.checkIcon}
              />
            </View>
          </View>
          <TextInput style={styles.totalContainer}
            defaultValue={stringNullText(third.otherAmount)}
            placeholder='Amount'
            keyboardType='numeric'
            onChangeText={(val) => value = val}
            onEndEditing={() => {
              setThird(settotal => ({
                ...settotal,
                otherAmount: Number(value),
              }))
              value = ''
            }}
          />
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.titleRow}>Second Floor :</Text>
          <View style={styles.checkPlusContainer}>
            <View style={{ flex: 1, flexDirection: "row" }}>
              <CheckBox
                style={{ flex: 1 }}
                onClick={() => {
                  setSecond(ev => ({
                    ...ev,
                    otherFlag: 0,
                  }))
                }}
                isChecked={second.otherFlag === 0}
                rightText={"+"}
                rightTextStyle={styles.checkIcon}
              />
              <CheckBox
                style={{ flex: 1 }}
                onClick={() => {
                  setSecond(ev => ({
                    ...ev,
                    otherFlag: 1,
                  }))
                }}
                isChecked={second.otherFlag === 1}
                rightText={"-"}
                rightTextStyle={styles.checkIcon}
              />
            </View>
          </View>
          <TextInput style={styles.totalContainer}
            defaultValue={stringNullText(second.otherAmount)}
            placeholder='Amount'
            keyboardType='numeric'
            onChangeText={(val) => value = val}
            onEndEditing={() => {
              setSecond(settotal => ({
                ...settotal,
                otherAmount: Number(value),
              }))
              value = ''
            }}
          />
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={'white'}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
      >
        <Text style={[styles.headerCenter]}>Bill Calculation</Text>

        <Text style={styles.headerTitle}>Total Bill & Unit</Text>
        <RenderTotalBill />
        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ flex: 0.8 }}>
            <Text style={styles.headerTitle}>Unit</Text>
          </View>
          <View style={{ flex: 0.3, justifyContent: "center" }}>
            <CheckBox
              onClick={() => {
                setFirstInclude(!firstInclude)
              }}
              isChecked={firstInclude}
              leftText={"First Floor"}
              leftTextStyle={styles.checkIcon}
            />
          </View>
        </View>
        <RenderTotal />
        <Text style={styles.headerTitle}>Drinking Water</Text>
        <DrinkingContainer />
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
          <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
            <Row data={['', 'Unit used', 'TotalUnit', 'Total Bill', 'Drinking Pay', `Total Pay`]} style={styles.head} textStyle={styles.text} />
            <Rows data={[
              ['Third', `${third.perviousUnit - third.currentUnit}`, `${third.totalUnit.toFixed(2)}`, `${third.totalAmount}`, `${third.otherFlag === 0 ? '+' : third.otherFlag === 1 ? '-' : ''} ${third.otherAmount.toFixed(2)}`, `${third.totalAmountDrink.toFixed(2)}`],
              ['Second', `${second.perviousUnit - second.currentUnit}`, `${second.totalUnit.toFixed(2)}`, `${second.totalAmount}`, `${second.otherFlag === 0 ? '+' : second.otherFlag === 1 ? '-' : ''} ${second.otherAmount.toFixed(2)}`, `${second.totalAmountDrink.toFixed(2)}`],
              showFirst && ['First', ``, `${handleFirstCalculate().unitUsed}`, `${handleFirstCalculate().totalBill}`, `${((third.otherAmount - second.otherAmount).toFixed(2))}`, `${handleFirstCalculate().totalBillAmount}`],
            ]} textStyle={styles.text} />
            <Row data={[``, `Motor Unit: ${per.motor}`]} style={styles.head} textStyle={styles.text} />
            <Row data={[``, `Per Unit : ${per.unit}`]} style={styles.head} textStyle={styles.text} />
            <Row data={[``, `TotalBill : ${handleFirstCalculate().totalBillAmount + second.totalAmountDrink.toFixed(2) + third.totalAmountDrink.toFixed(2)}`]} style={styles.head} textStyle={styles.text} />
          </Table>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    backgroundColor: '#ffffff'
  },
  headerCenter: {
    fontSize: moderateScale(20),
    justifyContent: "center",
    alignSelf: "center",
    fontWeight: 'bold',
    color: "black",
    marginVertical: verticalScale(10)
  },
  headerTitle: {
    fontSize: moderateScale(15),
    fontWeight: 'bold',
    color: "black",
    marginVertical: verticalScale(10)
  },
  titleRow: {
    flex: 0.3,
    alignSelf: "center",
    fontSize: moderateScale(12),
    fontWeight: 'normal',
    color: "black",
  },
  errorRow: {
    flex: 0.3,
    alignSelf: "center",
    fontSize: moderateScale(12),
    fontWeight: 'normal',
    color: "red",
  },
  totalRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
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
    marginRight: horizontalScale(5)
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
    color: "black",
  },
  totalBillUnit: {
    flex: 0.2,
    alignSelf: "center",
    fontSize: moderateScale(12),
    fontWeight: 'normal',
    color: "black",
  },
  totalBillInput: {
    height: verticalScale(40),
    borderWidth: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    flex: 0.8,
    marginLeft: horizontalScale(20)
  },
  buttonContainer: {
    marginVertical: verticalScale(20),
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: verticalScale(10),
    paddingHorizontal: horizontalScale(10),
    borderRadius: moderateScale(20),
    width: horizontalScale(150)
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6, color: "black" }
});

export default Home;
