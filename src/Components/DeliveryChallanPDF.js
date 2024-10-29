import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { COMPANY_IMAGES } from './Images';

// Register font
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center',
  },
  logoSection: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 50,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: 'red',
  },
  gst: {
    fontSize: 10,
  },
  addressSection: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  addressBlock: {
    flex: 2,
  },
  addressTitle: {
    fontSize: 10,
    fontWeight: 'extrabold',
    color: 'blue',
    marginBottom: 5,
    marginTop: 5,
  },
  customerTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'blue',
  },
  addressText: {
    fontSize: 9,
  },
  challanDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 0.5,
    padding: 5,
    minHeight: 25,
    alignItems: 'center',
  },
  tableCell: {
    fontSize: 8,
    textAlign: 'center',
  },
  tableCellHeader: {
    fontSize: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  col1: { width: '5%' },    // S.No
  col2: { width: '50%' },   // Description
  col3: { width: '15%' },   // Width
  col4: { width: '15%' },   // Height
  col5: { width: '15%' },   // Qty
  
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#000',
  },
  signatureBox: {
    width: '45%',
    alignItems: 'center',
  },
  signatureImage: {
    width: 80,
    height: 40,
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  signatureLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 5,
  },
  vehicleDetails: {
    marginTop: 20,
    marginBottom: 20,
  },
  vehicleTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  vehicleText: {
    fontSize: 9,
    marginBottom: 2,
  },
  totalsSection: {
    marginTop: 20,
    marginBottom: 20,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  totalLabel: {
    fontSize: 9,
    fontWeight: 'bold',
    marginRight: 10,
  },
  totalVal: {
    fontSize: 9,
    width: 100,
    textAlign: 'left',
  },
  grandTotal: {
    fontSize: 10,
    fontWeight: 'bold',
    borderTopWidth: 1,
    borderTopColor: '#000',
    paddingTop: 5,
  }
});

const DeliveryChallanPDF = ({ challanData, totals }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <Image
            style={styles.logo}
            src={COMPANY_IMAGES.LOGO}
          />
        </View>
        <Text style={styles.title}>Delivery Challan</Text>
        <Text style={styles.gst}>GST NO: 36CLPG9226N1ZL</Text>
      </View>

      {/* Addresses */}
      <View style={styles.addressSection}>
        <View style={styles.addressBlock}>
          <Text style={styles.addressTitle}>From:</Text>
          <Text style={styles.addressText}>
            Road 6 Venkat Rao Nagar, Kukatpally
          </Text>
          <Text style={styles.addressText}>
            Hyderabad,Telangana - 500072
          </Text>
        </View>
        <View style={styles.addressBlock}>
          <Text style={styles.customerTitle}>To:</Text>
          <Text style={styles.addressText}>Customer Name: {challanData.customerName}</Text>
          <Text style={styles.addressText}>Sub Name: {challanData.customerSubBranchName}</Text>
          <Text style={styles.addressText}>GST Number: {challanData.gstNumber}</Text>
          <Text style={styles.addressTitle}>Delivery Address:</Text>
          <Text style={styles.addressText}>{challanData.shippingAddress}</Text>
        </View>
      </View>

      {/* Challan Details */}
      <View style={styles.challanDetails}>
        <Text style={styles.addressText}>Challan No: {challanData.challanNumber}</Text>
        <Text style={styles.addressText}>Date: {challanData.challanDate}</Text>
      </View>

      {/* Vehicle Details */}
      {/* <View style={styles.vehicleDetails}>
        <Text style={styles.vehicleTitle}>Transport Details:</Text>
        <Text style={styles.vehicleText}>Vehicle Number: {challanData.vehicleNumber}</Text>
        <Text style={styles.vehicleText}>Transport Mode: {challanData.transportMode}</Text>
        <Text style={styles.vehicleText}>Driver Name: {challanData.driverName}</Text>
        <Text style={styles.vehicleText}>Contact Number: {challanData.driverContact}</Text>
      </View> */}

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCellHeader, styles.col1]}>S.No</Text>
          <Text style={[styles.tableCellHeader, styles.col2]}>Description</Text>
          <Text style={[styles.tableCellHeader, styles.col3]}>Width</Text>
          <Text style={[styles.tableCellHeader, styles.col4]}>Height</Text>
          <Text style={[styles.tableCellHeader, styles.col5]}>Qty</Text>
        </View>

        {challanData.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={[styles.tableCell, styles.col1]}>{index + 1}</Text>
            <Text style={[styles.tableCell, styles.col2]}>{item.description}</Text>
            <Text style={[styles.tableCell, styles.col3]}>{item.width}</Text>
            <Text style={[styles.tableCell, styles.col4]}>{item.height}</Text>
            <Text style={[styles.tableCell, styles.col5]}>{item.qty}</Text>
          </View>
        ))}
      </View>

      {/* Totals Section */}
      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total Quantity:</Text>
          <Text style={styles.totalVal}>{totals}</Text>
        </View>
       
      </View>

      {/* Signature Section */}
      <View style={styles.signatureContainer}>
        <View style={styles.signatureBox}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureText}>Receiver's Signature</Text>
          <Text style={[styles.addressText, { marginTop: 5 }]}>Name:</Text>
          <Text style={[styles.addressText, { marginTop: 5 }]}>Date:</Text>
        </View>

        <View style={styles.signatureBox}>
          <Image
            style={styles.signatureImage}
            src={COMPANY_IMAGES.SIGNATURE}
          />
          <Text style={styles.signatureText}>Authorized Signatory</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export const generateDeliveryChallanPDF = async (challanData, totals) => {
    console.log("total is",totals)
  const blob = await pdf(<DeliveryChallanPDF challanData={challanData} totals={totals} />).toBlob();
  saveAs(blob, `delivery-challan-${challanData.challanNumber}.pdf`);
};

export default DeliveryChallanPDF;