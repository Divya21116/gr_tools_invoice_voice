import React from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, Font } from '@react-pdf/renderer';
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { COMPANY_IMAGES } from './Images';
// Register font
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

// Updated styles to include logo
const styles = StyleSheet.create({
  // ... (keeping all existing styles)
  page: {
    padding: 30,
    fontFamily: 'Roboto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    alignItems: 'center', // Add this to vertically align items
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
  companyName: {
    fontSize: 12,
    fontWeight: 'bold',
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
  descriptionText: {
    fontSize: 8,
    textAlign: 'left',
    paddingRight: 5,
    lineHeight: 1.2,
  },
  estimationDetails: {
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
    minHeight: 25, // Added to ensure consistent row height
    alignItems: 'center', // Center content vertically
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
  // Column widths adjusted to match your layout
  col1: { width: '4%' },
  col2: { width: '20%' },
  col3: { width: '7%' },
  col4: { width: '7%' },
  col5: { width: '7%' },
  col6: { width: '7%' },
  col7: { width: '8%' },
  col8: { width: '8%' },
  col9: { width: '8%' },
  col10: { width: '8%' },
  col11: { width: '8%' },
  col12: { width: '8%' },
  summary: {
    marginTop: 20,
    flexDirection: 'row',
  },
  bankDetails: {
    flex: 1,
    borderRight: 1,
    paddingRight: 10,
  },
  bankTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  bankText: {
    fontSize: 9,
    marginBottom: 2,
  },
  totals: {
    flex: 1,
    paddingLeft: 10,
    alignItems: 'flex-end',
  },
  totalText: {
    fontSize: 8,
    marginBottom: 2,
  },
  totalAmount: {
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 5,
  },
  amountInWords: {
    fontSize: 8,
    marginTop: 5,
    maxWidth: 300,
    textAlign: 'right',
  },
  // Added styles for description section
  descriptionSection: {
    marginBottom: 15,
  },
  descriptionTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  signatureContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 20,
  },
  termsSection: {
    width: '75%', // Adjust width as needed
    paddingRight: 10,
  },
  termsTitle: {
    fontWeight: 'bold',
    fontSize: 10,
    marginBottom: 5,
  },
  termText: {
    fontSize: 8,
    marginBottom: 3,
  },
  signatureSection: {
    alignItems: 'center',
    width: '25%', // Adjust width as needed
  },
  signatureImage: {
    width: 80, // Adjust size as needed
    height: 40,
    marginBottom: 5,
  },
  signatureText: {
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'right',
  },
});

const EstimationPDF = ({ estimationData, totals, totalAmountInWords, bankDetails, logoUrl, signatureUrl }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Updated Header with Logo */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <Image
            style={styles.logo}
            src={COMPANY_IMAGES.LOGO}
          />
          
        </View>
        <Text style={styles.title}>Estimation</Text>
        <Text style={styles.gst}>GST NO: 36CLPG9226N1ZL</Text>
      </View>

    {/* Addresses */}
    <View style={styles.addressSection}>
        <View style={styles.addressBlock}>
          <Text style={styles.addressTitle}>Company Address:</Text>
          <Text style={styles.addressText}>
            Road 6 Venkat Rao Nagar, Kukatpally
          </Text>
          <Text style={styles.addressText}>
            Hyderabad,Telangana - 500072
          </Text>
        </View>
        <View style={styles.addressBlock}>
        <Text style={styles.customerTitle}>Customer Details:</Text>
          <Text style={styles.addressText}>Customer Name: {estimationData.customerName}</Text>
          <Text style={styles.addressText}>Sub Name: {estimationData.customerSubBranchName}</Text>
          <Text style={styles.addressText}>GST Number: {estimationData.gstNumber}</Text>
          <Text style={styles.addressTitle}>Shipping Address:</Text>
          <Text style={styles.addressText}>{estimationData.shippingAddress}</Text>
          
        </View>
      </View>

      {/* Invoice Details */}
      <View style={styles.estimationDetails}>
        <Text style={styles.addressText}>Estimation Number: {estimationData.estimationNumber}</Text>
        <Text style={styles.addressText}>Estimation Date: {estimationData.estimationDate}</Text>
        <Text style={styles.addressText}>Due Date: {estimationData.dueDate}</Text>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableCellHeader, styles.col1]}>S.No</Text>
          <Text style={[styles.tableCellHeader, styles.col2]}>Description</Text>
          <Text style={[styles.tableCellHeader, styles.col3]}>Width </Text>
          <Text style={[styles.tableCellHeader, styles.col4]}>Height</Text>
          <Text style={[styles.tableCellHeader, styles.col5]}>Qty</Text>
          <Text style={[styles.tableCellHeader, styles.col6]}>Unit</Text>
          <Text style={[styles.tableCellHeader, styles.col7]}>SFT</Text>
          <Text style={[styles.tableCellHeader, styles.col8]}>Rate (₹)</Text>
          <Text style={[styles.tableCellHeader, styles.col9]}>Amount (₹)</Text>
          <Text style={[styles.tableCellHeader, styles.col10]}>CGST (₹)</Text>
          <Text style={[styles.tableCellHeader, styles.col11]}>SGST (₹)</Text>
          <Text style={[styles.tableCellHeader, styles.col12]}>Total (₹)</Text>
        </View>

        {estimationData.items.map((item, index) => (
          <View style={styles.tableRow} key={index}>
            <Text style={[styles.tableCell, styles.col1]}>{index + 1}</Text>
            <View style={[styles.col2]}>
              <Text style={styles.descriptionText}>{item.description}</Text>
            </View>
            <Text style={[styles.tableCell, styles.col3]}>{item.width}</Text>
            <Text style={[styles.tableCell, styles.col4]}>{item.height}</Text>
            <Text style={[styles.tableCell, styles.col5]}>{item.qty}</Text>
            <Text style={[styles.tableCell, styles.col6]}>{item.unit}</Text>
            <Text style={[styles.tableCell, styles.col7]}>
            {(item.unit === 'inches' 
    ? ((item.width * item.height) / 144) * item.qty 
    : (item.width * item.height) * item.qty).toFixed(2)}
            </Text>
            <Text style={[styles.tableCell, styles.col8]}>{item.rate}</Text>
            <Text style={[styles.tableCell, styles.col9]}>{item.amount.toFixed(2)}</Text>
            <Text style={[styles.tableCell, styles.col10]}>{item.cgst.toFixed(2)}</Text>
            <Text style={[styles.tableCell, styles.col11]}>{item.sgst.toFixed(2)}</Text>
            <Text style={[styles.tableCell, styles.col12]}>
              {(item.amount + item.cgst + item.sgst).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Summary Section */}
      <View style={styles.summary}>
        <View style={styles.bankDetails}>
          <Text style={styles.bankTitle}>Bank Details:</Text>
          <Text style={styles.bankText}>{bankDetails.bankName}</Text>
          <Text style={styles.bankText}>{bankDetails.accountHolderName}</Text>
          <Text style={styles.bankText}>Account Number: {bankDetails.accountNumber}</Text>
          <Text style={styles.bankText}>IFSC Code: {bankDetails.ifscCode}</Text>
          <Text style={styles.bankText}>Branch: {bankDetails.branch}</Text>
        </View>

        <View style={styles.totals}>
          <Text style={styles.totalText}>Subtotal: ₹{totals.subtotal.toFixed(2)}</Text>
          <Text style={styles.totalText}>CGST: ₹{totals.totalCgst.toFixed(2)}</Text>
          <Text style={styles.totalText}>SGST: ₹{totals.totalSgst.toFixed(2)}</Text>
          <Text style={styles.totalAmount}>
            Total: ₹{totals.totalAmount.toFixed(2)}
          </Text>
          <Text style={styles.amountInWords}>
            Amount in Words: {totalAmountInWords}
          </Text>
        </View>
      </View>
        {console.log("at image area")}
      {/* Updated Signature Section */}
      <View style={styles.signatureContainer}>
  {/* Terms and Conditions Section */}
  <View style={styles.termsSection}>
    <Text style={styles.termsTitle}>Terms and Conditions:</Text>
    <Text style={styles.termText}>
      1. Work will proceed after the confirmation of purchase order and Advance 50% amount.
    </Text>
    <Text style={styles.termText}>
      2. Work will be delivered within 5 to 30 Days from the PO's or Advance amount received.
    </Text>
    <Text style={styles.termText}>
      3. Above estimation may vary from 15 to 30 days.
    </Text>
    <Text style={styles.termText}>
      4. Artworks will not change after the confirmation/work started (in case of any changes, extra charges will be applicable).
    </Text>
  </View>

  {/* Signature Section */}
  <View style={styles.signatureSection}>
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

// Updated generate PDF function to include logo and signature URLs
export const generatePDF = async (
  estimationData, 
  totals, 
  totalAmountInWords, 
  bankDetails, 
) => {
  const blob = await pdf(
    <EstimationPDF
      estimationData={estimationData}
      totals={totals}
      totalAmountInWords={totalAmountInWords}
      bankDetails={bankDetails}
      logoUrl="https://i.ibb.co/TqvLRWL/signature.png"
      signatureUrl="https://i.ibb.co/TqvLRWL/signature.png"
    />
  ).toBlob();
  saveAs(blob, `estimation-${estimationData.estimationNumber}.pdf`);
};

export default EstimationPDF;