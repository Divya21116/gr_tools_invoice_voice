// invoiceStorage.js
export const saveInvoiceToStorage = (invoiceData) => {
    try {
      // Get existing invoices
      const existingInvoices = JSON.parse(localStorage.getItem('invoices')) || [];
      
      // Add new invoice
      existingInvoices.push(invoiceData);
      
      // Save back to localStorage
      localStorage.setItem('invoices', JSON.stringify(existingInvoices));
      
      return true;
    } catch (error) {
      console.error('Error saving invoice:', error);
      return false;
    }
  };
  
  export const getLastInvoiceNumber = () => {
    try {
      const invoices = JSON.parse(localStorage.getItem('invoices')) || [];
      if (invoices.length === 0) return 'INV-001';
      
      // Get the last invoice number and increment it
      const lastInvoice = invoices[invoices.length - 1];
      const lastNumber = parseInt(lastInvoice.invoiceNumber.split('-')[1]);
      return `INV-${String(lastNumber + 1).padStart(3, '0')}`;
    } catch (error) {
      console.error('Error getting last invoice number:', error);
      return 'INV-001';
    }
  };
  
  export const getAllInvoices = () => {
    try {
      return JSON.parse(localStorage.getItem('invoices')) || [];
    } catch (error) {
      console.error('Error getting invoices:', error);
      return [];
    }
  };