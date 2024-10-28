import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font,PDFDownloadLink } from '@react-pdf/renderer';

// Register custom fonts if needed
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf'
});

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontSize: 12,
    fontFamily: 'Roboto',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  companyInfo: {
    width: '50%',
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  companyAddress: {
    color: '#555',
    lineHeight: 1.5,
  },
  invoiceTitle: {
    fontSize: 32,
    color: '#2876c6',
    marginBottom: 30,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  billTo: {
    width: '50%',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoDetails: {
    lineHeight: 1.5,
    color: '#555',
  },
  invoiceDetails: {
    width: '40%',
    backgroundColor: '#f6f6f6',
    padding: 15,
    borderRadius: 5,
  },
  invoiceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  table: {
    marginTop: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f6f6f6',
    padding: 10,
    borderBottom: 1,
    borderBottomColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: 1,
    borderBottomColor: '#eee',
    padding: 10,
  },
  description: { width: '40%' },
  quantity: { width: '15%' },
  rate: { width: '20%' },
  amount: { width: '25%' },
  totalsSection: {
    marginTop: 30,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  totalLabel: {
    width: 100,
  },
  totalAmount: {
    width: 120,
    textAlign: 'right',
  },
  grandTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2876c6',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    color: '#666',
    fontSize: 10,
    borderTop: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
});

const InvoicePDF = ({ invoiceData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>{invoiceData.companyName}</Text>
          <Text style={styles.companyAddress}>
            {invoiceData.companyAddress.street}{'\n'}
            {invoiceData.companyAddress.city}, {invoiceData.companyAddress.state} {invoiceData.companyAddress.zip}{'\n'}
            {invoiceData.companyAddress.country}{'\n'}
            {invoiceData.companyPhone}
          </Text>
        </View>
        <View>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
        </View>
      </View>

      {/* Bill To & Invoice Details Section */}
      <View style={styles.infoSection}>
        <View style={styles.billTo}>
          <Text style={styles.infoTitle}>Bill To</Text>
          <Text style={styles.infoDetails}>
            {invoiceData.clientName}{'\n'}
            {invoiceData.clientAddress.street}{'\n'}
            {invoiceData.clientAddress.city}, {invoiceData.clientAddress.state} {invoiceData.clientAddress.zip}{'\n'}
            {invoiceData.clientAddress.country}
          </Text>
        </View>
        <View style={styles.invoiceDetails}>
          <View style={styles.invoiceRow}>
            <Text>Invoice Number:</Text>
            <Text>{invoiceData.invoiceNumber}</Text>
          </View>
          <View style={styles.invoiceRow}>
            <Text>Invoice Date:</Text>
            <Text>{invoiceData.invoiceDate}</Text>
          </View>
          <View style={styles.invoiceRow}>
            <Text>Due Date:</Text>
            <Text>{invoiceData.dueDate}</Text>
          </View>
        </View>
      </View>

      {/* Items Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.quantity}>Quantity</Text>
          <Text style={styles.rate}>Rate</Text>
          <Text style={styles.amount}>Amount</Text>
        </View>
        
        {invoiceData.items.map((item, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.quantity}>{item.quantity}</Text>
            <Text style={styles.rate}>${item.rate.toFixed(2)}</Text>
            <Text style={styles.amount}>${(item.quantity * item.rate).toFixed(2)}</Text>
          </View>
        ))}
      </View>

      {/* Totals Section */}
      <View style={styles.totalsSection}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Subtotal:</Text>
          <Text style={styles.totalAmount}>${invoiceData.subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tax ({invoiceData.taxRate}%):</Text>
          <Text style={styles.totalAmount}>${invoiceData.taxAmount.toFixed(2)}</Text>
        </View>
        <View style={[styles.totalRow, styles.grandTotal]}>
          <Text style={styles.totalLabel}>Total Due:</Text>
          <Text style={styles.totalAmount}>${invoiceData.totalAmount.toFixed(2)}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text>Thank you for your business!</Text>
      </View>
    </Page>
  </Document>
);

// Usage Component
const InvoiceDownload = () => {
  const invoiceData = {
    companyName: "Your Company Name",
    companyAddress: {
      street: "123 Business Street",
      city: "City",
      state: "State",
      zip: "12345",
      country: "Country"
    },
    companyPhone: "+1 234 567 8900",
    clientName: "Client Name",
    clientAddress: {
      street: "456 Client Street",
      city: "Client City",
      state: "Client State",
      zip: "67890",
      country: "Client Country"
    },
    invoiceNumber: "INV-2024-001",
    invoiceDate: "2024-01-28",
    dueDate: "2024-02-28",
    items: [
      {
        description: "Web Development Services",
        quantity: 1,
        rate: 1000.00
      },
      {
        description: "Hosting (Annual)",
        quantity: 1,
        rate: 200.00
      }
    ],
    subtotal: 1200.00,
    taxRate: 10,
    taxAmount: 120.00,
    totalAmount: 1320.00
  };

  return (
    <PDFDownloadLink
      document={<InvoicePDF invoiceData={invoiceData} />}
      fileName={`Invoice-${invoiceData.invoiceNumber}.pdf`}
    >
      {({ loading }) => (loading ? 'Generating PDF...' : 'Download Invoice')}
    </PDFDownloadLink>
  );
};

export default InvoiceDownload;