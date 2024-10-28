import React, { useState, useRef,useEffect} from 'react';
import {
  Grid, TextField, Button, Typography, Select, MenuItem, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, Paper,Box,Snackbar,
  Alert
} from '@mui/material';
import { numberToWords } from './utils'; // Import the utility function
import logoImage from '../assets/logogr.png';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { generatePDF } from './InvoicePDF';
import { saveInvoiceToStorage, getLastInvoiceNumber } from './InvoiceStorage';
const InvoiceForm = () => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const [invoiceData, setInvoiceData] = useState({
    shippingAddress: '',
    customerName: '',
    invoiceNumber: '',
    invoiceDate: new Date().toISOString().slice(0, 10),
    dueDate: '',
    items: [
      { description: '', width: 0, height: 0, qty: 1, unit: 'inches', rate: 0, amount: 0, cgst: 0, sgst: 0 },
    ],
  });

  // Initialize invoice number when component mounts
  useEffect(() => {
    const newInvoiceNumber = getLastInvoiceNumber();
    setInvoiceData(prev => ({
      ...prev,
      invoiceNumber: newInvoiceNumber
    }));
  }, []);

  const handleSaveInvoice = () => {
    // Add timestamp for sorting/reference
    const invoiceToSave = {
      ...invoiceData,
      timestamp: new Date().toISOString(),
      totals: calculateTotals()
    };

    if (saveInvoiceToStorage(invoiceToSave)) {
      setSnackbar({
        open: true,
        message: 'Invoice saved successfully!',
        severity: 'success'
      });

      // Reset form with new invoice number
      resetForm();
    } else {
      setSnackbar({
        open: true,
        message: 'Error saving invoice',
        severity: 'error'
      });
    }
  };

  const resetForm = () => {
    const newInvoiceNumber = getLastInvoiceNumber();
    setInvoiceData({
      shippingAddress: '',
      customerName: '',
      invoiceNumber: newInvoiceNumber,
      invoiceDate: new Date().toISOString().slice(0, 10),
      dueDate: '',
      items: [
        { description: '', width: 0, height: 0, qty: 1, unit: 'inches', rate: 0, amount: 0, cgst: 0, sgst: 0 },
      ],
    });
  };


  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const items = [...invoiceData.items];

    // Update item fields dynamically
    items[index][name] = value;
    // const description=items[index].description;
    const width = parseFloat(items[index].width) || 0;
    const height = parseFloat(items[index].height) || 0;
    const qty = parseFloat(items[index].qty) || 1;
    const rate = parseFloat(items[index].rate) || 0;

    const sft = items[index].unit === 'inches' ? (width / 12) * (height / 12) : width * height;
    const amount = qty * sft * rate;
    const cgst = amount * 0.09;
    const sgst = amount * 0.09;

    items[index] = { ...items[index], amount, cgst, sgst };
    setInvoiceData({ ...invoiceData, items });
  };

  const addItem = () => {
    setInvoiceData(prevState => ({
      ...prevState,
      items: [
        ...prevState.items,
        { description: '', width: 0, height: 0, qty: 1, unit: 'inches', rate: 0, amount: 0, cgst: 0, sgst: 0 },
      ],
    }));
  };

  const calculateTotals = () => {
    const subtotal = invoiceData.items.reduce((acc, item) => acc + (item.amount || 0), 0);
    const totalCgst = invoiceData.items.reduce((acc, item) => acc + (item.cgst || 0), 0);
    const totalSgst = invoiceData.items.reduce((acc, item) => acc + (item.sgst || 0), 0);
    const totalAmount = subtotal + totalCgst + totalSgst;

    return { subtotal, totalCgst, totalSgst, totalAmount };
  };

  const totals = calculateTotals();
  const totalAmountInWords = numberToWords(Math.round(totals.totalAmount));
  const invoiceRef = useRef(null);

  // const generatePDF = async () => {
  //   const element = invoiceRef.current;
  //   const canvas = await html2canvas(element);
  //   const data = canvas.toDataURL('image/png');

  //   const pdf = new jsPDF();
  //   const imgProperties = pdf.getImageProperties(data);
  //   const pdfWidth = pdf.internal.pageSize.getWidth();
  //   const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

  //   pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //   pdf.save('invoice.pdf');
  // };
  const handleGeneratePDF = () => {
    generatePDF(invoiceData, totals, totalAmountInWords, bankDetails);
  };
  const bankDetails = {
    bankName: 'Your Bank Name',
    accountNumber: '1234567890',
    ifscCode: 'BANK0001234',
    branch: 'Branch Name',
    accountHolderName: 'Account Holder Name',
  };
  const tableStyles = {
    // Reduced cell padding
    '& .MuiTableCell-root': {
      padding: '2px',
      fontSize: '10px',
      height: '32px'
    },
    // Smaller input fields within table
    '& .MuiInputBase-root': {
      height: '24px',
    },
    '& .MuiInputBase-input': {
      fontSize: '10px',
      padding: '2px 4px',
    },
    // Smaller select component
    '& .MuiSelect-select': {
      fontSize: '10px',
      padding: '2px 4px',
      height: '20px',
      lineHeight: '20px',
    }
  };
  return (
    <Grid >
      <Grid container ref={invoiceRef} sx={{ width: '70%', margin: '0 auto', padding: '20px', border: '1px solid #000', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
        {/* Header */}
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          <Grid item>
            <img src={logoImage} alt="Company Logo" style={{ width: '150px' }} />
          </Grid>
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'red' }}>Invoice</Typography>
          </Grid>
          <Grid item>
            <Typography sx={{ fontSize: '12px' }}>GST: 36CLPG9226N1ZL</Typography>
          </Grid>
        </Grid>

        {/* Company and Shipping Address */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: 'bold', color: '#333', marginTop: '10px', fontSize: '10px' }}>Company Address:</Typography>
            <Typography sx={{ fontSize: '10px' }}>Road 6 Venkat Rao Nagar, Kukatpally, Hyderabad - 500072</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: 'bold', color: '#333', marginTop: '10px', fontSize: '10px' }}>Shipping Address:</Typography>
            <TextField
              fullWidth
              label="Shipping Address"
              size="small"
              value={invoiceData.shippingAddress}
              onChange={(e) => setInvoiceData({ ...invoiceData, shippingAddress: e.target.value })}
              sx={{ marginBottom: '10px', backgroundColor: '#fff', '& .MuiInputLabel-root': { fontSize: '10px' }, '& .MuiInputBase-input': { 
                fontSize: '10px',
                padding: '2px 4px',
                height: '20px'
              } }}
            />
            <TextField
              fullWidth
              label="Customer Name"
              size="small"
              value={invoiceData.customerName}
              onChange={(e) => setInvoiceData({ ...invoiceData, customerName: e.target.value })}
              sx={{ marginBottom: '10px', backgroundColor: '#fff', '& .MuiInputLabel-root': { fontSize: '10px' }, '& .MuiInputBase-input': { 
                fontSize: '10px',
                padding: '2px 4px',
                height: '20px'
              } }}
            />
          </Grid>
        </Grid>

        {/* Invoice Number and Dates */}
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: 'bold', color: '#333', marginTop: '10px', fontSize: '10px' }}>Invoice Number: {invoiceData.invoiceNumber}</Typography>
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              size="small"
              label="Invoice Date"
              type="date"
              value={invoiceData.invoiceDate}
              onChange={(e) => setInvoiceData({ ...invoiceData, invoiceDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: '10px', backgroundColor: '#fff', '& .MuiInputLabel-root': { fontSize: '10px' }, '& .MuiInputBase-input': { fontSize: '10px' } }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              size="small"
              label="Due Date"
              type="date"
              value={invoiceData.dueDate}
              onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ marginBottom: '10px', backgroundColor: '#fff', '& .MuiInputLabel-root': { fontSize: '10px' }, '& .MuiInputBase-input': { fontSize: '10px' } }}
            />
          </Grid>
        </Grid>

        {/* Items Table */}
        <Grid container>
        <Grid item xs={12}>
          <TableContainer 
            component={Paper} 
            sx={{ 
              border: '1px solid #000',
              '& .MuiTable-root': {
                minWidth: 650,
                maxWidth: '100%',
              },
              ...tableStyles
            }}
          >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>S.No</TableCell>
                  <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>Description</TableCell>
                  <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>W (ft)</TableCell>
                  <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>H (ft)</TableCell>
                  <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>Qty</TableCell>
                  <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>Unit</TableCell>
                  <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>SFT</TableCell>
                  <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>Rate (₹)</TableCell>
                  <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>Amount (₹)</TableCell>
                  <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>CGST (₹)</TableCell>
                  <TableCell sx={{ fontSize: '10px', fontWeight: 'bold' }}>SGST (₹)</TableCell>
                  <TableCell sx={{fontSize: '10px', fontWeight: 'bold' }}>Total (₹)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceData.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                    <TextField
  onChange={(e) => handleInputChange(e, index)}
  size="small"
  name='description'
  multiline
  rows={1}
  maxRows={4}  // Adjust this number based on how many rows you want to allow
  sx={{
    width: '120px',
    '& .MuiInputBase-root': {
      minHeight: '20px',
      height: 'auto',
    },
    '& .MuiInputBase-input': {
      fontSize: '10px',
      padding: '2px 4px',
      overflow: 'auto',
      resize: 'vertical',
    },
    '& .MuiOutlinedInput-root': {
      padding: '0',
    },
    // Ensure the textarea grows with content
    '& textarea': {
      overflowY: 'auto !important',
      minHeight: '20px !important',
      height: 'auto !important',
      lineHeight: '1.2 !important'
    }
  }}
/>
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="width"
                        type="number"
                        value={item.width}
                        onChange={(e) => handleInputChange(e, index)}
                        size="small"
                        sx={{ 
                          width: '50px',
                          '& .MuiInputBase-input': { 
                            fontSize: '10px',
                            padding: '2px 4px',
                            height: '20px'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="height"
                        type="number"
                        value={item.height}
                        onChange={(e) => handleInputChange(e, index)}
                        size="small"
                        sx={{ 
                          width: '50px',
                          '& .MuiInputBase-input': { 
                            fontSize: '10px',
                            padding: '2px 4px',
                            height: '20px'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <TextField
                        name="qty"
                        type="number"
                        value={item.qty}
                        onChange={(e) => handleInputChange(e, index)}
                        size="small"
                        sx={{ 
                          width: '50px',
                          '& .MuiInputBase-input': { 
                            fontSize: '10px',
                            padding: '2px 4px',
                            height: '20px'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        name="unit"
                        value={item.unit}
                        onChange={(e) => handleInputChange(e, index)}
                        size="small"
                        sx={{ 
                          width: '60px',
                          height: '24px',
                          '& .MuiSelect-select': {
                            fontSize: '10px',
                            padding: '2px 4px',
                          }
                        }}
                      >
                        <MenuItem value="inches">Inches</MenuItem>
                        <MenuItem value="feet">Feet</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>{(item.width * item.height * item.qty).toFixed(2)}</TableCell>
                    <TableCell>
                      <TextField
                        name="rate"
                        type="number"
                        value={item.rate}
                        onChange={(e) => handleInputChange(e, index)}
                        size="small"
                        sx={{ 
                          width: '50px',
                          '& .MuiInputBase-input': { 
                            fontSize: '10px',
                            padding: '2px 4px',
                            height: '20px'
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>{item.amount.toFixed(2)}</TableCell>
                    <TableCell>{item.cgst.toFixed(2)}</TableCell>
                    <TableCell>{item.sgst.toFixed(2)}</TableCell>
                    <TableCell>{(item.amount + item.cgst + item.sgst).toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>

        {/* Add Item Button */}
        <Grid container justifyContent="flex-start">
          <Button variant="contained" onClick={addItem} sx={{ margin: '20px 0' }}>Add Item</Button>
        </Grid>

        <Grid 
          container 
          sx={{ 
            marginTop: '20px',
            padding: '10px',
            border: '1px solid #ddd',
            borderRadius: '4px'
          }}
        >
          {/* Bank Details - Left Side */}
          <Grid item xs={6} sx={{ borderRight: '1px solid #ddd', paddingRight: '20px' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: '12px', marginBottom: '8px' }}>
              Bank Details:
            </Typography>
            <Typography sx={{ fontSize: '10px' }}>{bankDetails.bankName}</Typography>
            <Typography sx={{ fontSize: '10px' }}>{bankDetails.accountHolderName}</Typography>
            <Typography sx={{ fontSize: '10px' }}>Account Number: {bankDetails.accountNumber}</Typography>
            <Typography sx={{ fontSize: '10px' }}>IFSC Code: {bankDetails.ifscCode}</Typography>
            <Typography sx={{ fontSize: '10px' }}>Branch: {bankDetails.branch}</Typography>
          </Grid>

          {/* Total Summary - Right Side */}
          <Grid item xs={6} sx={{ paddingLeft: '20px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <Typography sx={{ fontSize: '10px' }}>Subtotal: ₹{totals.subtotal.toFixed(2)}</Typography>
              <Typography sx={{ fontSize: '10px' }}>CGST: ₹{totals.totalCgst.toFixed(2)}</Typography>
              <Typography sx={{ fontSize: '10px' }}>SGST: ₹{totals.totalSgst.toFixed(2)}</Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: 'bold', marginTop: '8px' }}>
                Total: ₹{totals.totalAmount.toFixed(2)}
              </Typography>
              <Typography sx={{ fontSize: '10px', marginTop: '4px', maxWidth: '300px', textAlign: 'right' }}>
                Amount in Words: {totalAmountInWords}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        {/* Bank Details */}
        
      </Grid>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleGeneratePDF}
          >
            Download Invoice
          </Button>
        </Grid>
        <Grid item>
          <Button 
            variant="contained" 
            color="secondary" 
            onClick={handleSaveInvoice}
          >
            Save Invoice
          </Button>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default InvoiceForm;
