import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Alert,
    View,
    TouchableOpacity,
    Image
} from 'react-native';
//@ts-ignore
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
//@ts-ignore
import Pdf from 'react-native-pdf';
import {dateFormat, invoiceDateFormat} from "../utilies/index"
const goBack = require("../common/assets/goback.png");
const share = require("../common/assets/share.png");
const logo = require("../common/assets/logo.jpg");

const PDFBill = ({ route, navigation }) => {
    const [path, setPath] = useState('');

    useEffect(() => {
        generatePDF();
    }, []);

    const sharePDF = async () => {
        try {
            const options = {
                type: 'application/pdf',
                url: `file://${path}`,
            };
            await Share.open(options);
        } catch (error) {
            Alert.alert("some thing went wrong on share");
            console.error('Error sharing PDF:', error);
        }
    };

    const htmlBody = () => {
        const { totalUnit, motorUnit, perUnit, third, second, first, motor, totalBill } = route.params;
        return `<html>
        <head>
            <style>
                body {
                    padding: 10;
                    font-family: Arial, sans-serif;
                    color: #333;
                }
        
                h1 {
                    color: #000;
                }
        
                .label {
                    font-size: 12px;
                }
        
                p {
                    font-size: 16px;
                }
        th{
            background-color: #D3D3D3;
        }
                th,
                td {
                    border: 1px solid;
                    text-align: center
                }
        
                footer {
                    position: fixed;
                    left: 0;
                    bottom: 0;
                    width: 100%;
                    background-color: #D3D3D3;
                }
        
                .textcenter {
                    text-align: center;
                }
            </style>
        </head>
        
        <body>
            <center>
                <div style=>
                    <img src="https://thumbs2.imgbox.com/54/a4/e5BhPs1e_t.jpg" style="width:50px;height:50px;">
                    <h1>Electricity Invoice</h1>
                    <div style='display:flex; justify-content:space-between'>
                        <p>Total Unit:${totalUnit}</p>
                        <p>Per Unit:₹ ${perUnit}</p>
                        <p>Motor Unit:${motorUnit}</p>
                    </div>
                    <table style="width:100%">
                        <tr>
                            <th>Floor</th>
                            <th>Current Unit</th>
                            <th>Pervious Unit</th>
                            <th>Unit Used</th>
                            <th>Total Unit</th>
                            <th>Total Bill</th>
                            <th>Drinking Pay</th>
                            <th>Total Pay</th>
                        </tr>
        
                        <tr>
                            <td>Third</td>
                            <td>${third.perviousUnit}</td>
                            <td>${third.currentUnit}</td>
                            <td>${third.perviousUnit - third.currentUnit}</td>
                            <td>${third.totalUnit.toFixed(2)}</td>
                            <td>${third.totalAmount}</td>
                            <td>${third.otherFlag === 0 ? '+' : third.otherFlag === 1 ? '-' : ''} ${third.otherAmount.toFixed(2)}</td>
                            <td>${third.totalAmountDrink.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>Second</td>
                            <td>${second.perviousUnit}</td>
                            <td>${second.currentUnit}</td>
                            <td>${second.perviousUnit - second.currentUnit}</td>
                            <td>${second.totalUnit.toFixed(2)}</td>
                            <td>${second.totalAmount}</td>
                            <td>${second.otherFlag === 0 ? '+' : second.otherFlag === 1 ? '-' : ''} ${second.otherAmount.toFixed(2)}</td>
                            <td>${second.totalAmountDrink.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>First</td>
                            <td>-</td>
                            <td>-</td>
                            <td>-</td>
                            <td>${first.totalUnit}</td>
                            <td>${first.totalBill}</td>
                            <td>${first.drinking}</td>
                            <td>${first.totalPay}</td>
                        </tr>
                        <tr>
                        <td>Motor</td>
                        <td>${motor.perviousUnit}</td>
                            <td>${motor.currentUnit}</td>
                            <td>${motor.perviousUnit - motor.currentUnit}</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                    </tr>
                        <tr class="total">
                            <td colspan="7">Total</td>
                            <td>₹ ${totalBill}</td>
                        </tr>
                    </table>
                    <p>Date: ${dateFormat()}</p>
                </div>
            </center>
        </body>
        <footer>
            <div style=' padding: 0px 10px;'>
                <div style='display:flex; justify-content: space-between'>
                    <p class="label">Developer By: Shivam Gupta, Vishal Gupta</h4>
                    <p class="label">Manage By: Hetal Gupta</h4>
                </div>
                <div style='display:flex; justify-content: space-between'>
                    <p style='margin:0'><a href="tel:832-068-1757">Contact: +91 8320681757</a></p>
                    <p style='margin:0'><a href="mailto:shivam.software.eng@gmai">shivam.software.eng@gmail.com</a></p>
                </div>
                <div style='text-align: center'>
                    <p>Bill is generated digitally, so no signature is required.
                    </p>
                </div>
            </div>
        </footer>
        </html>`
    }
    const generatePDF = async () => {
        try {
            let PDFOptions = {
                html: htmlBody(),
                fileName: `invoice_${invoiceDateFormat()}`,
                directory: 'Documents',
            };
            const file = await RNHTMLtoPDF.convert(PDFOptions);
            if (!file.filePath) return
            setPath(file.filePath)
        } catch (error: any) {
            Alert.alert("some thing went wrong on genearate");
            console.log('errroo to generate pdf', error.message);
        }
    }

    const Header = () => {
        return (
            <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                        style={styles.tinyLogo}
                        source={goBack}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={sharePDF}>
                    <Image
                        style={styles.tinyLogo}
                        source={share}
                    />
                </TouchableOpacity>

            </View>
        )
    }

    return (
        <View style={{ flex: 1, padding: 10, backgroundColor: '#fff' }}>
            <Header />
            <Pdf
                source={{ uri: path, cache: true }}
                style={{
                    flex: 1,
                    width: '100%',
                    height: "100%"
                }} />
        </View>
    );
}

const styles = StyleSheet.create({
    tinyLogo: {
        height: 25,
        width: 25,
        color: '#fff'
    }
});

export default PDFBill;
