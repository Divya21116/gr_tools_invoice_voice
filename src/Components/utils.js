// utils.js

export function numberToWords(num) {
    if (num === undefined || num === null) {
      return '';
    }
  
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  
    function convertLessThanOneThousand(n) {
      if (n === 0) {
        return '';
      }
  
      let result = '';
  
      if (n >= 100) {
        result += ones[Math.floor(n / 100)] + ' Hundred ';
        n %= 100;
      }
  
      if (n >= 20) {
        result += tens[Math.floor(n / 10)] + ' ';
        n %= 10;
      } else if (n >= 10) {
        result += teens[n - 10] + ' ';
        return result.trim();
      }
  
      if (n > 0) {
        result += ones[n] + ' ';
      }
  
      return result.trim();
    }
  
    if (num === 0) {
      return 'Zero';
    }
  
    const parts = [];
    const billions = Math.floor(num / 1000000000);
    const millions = Math.floor((num % 1000000000) / 1000000);
    const thousands = Math.floor((num % 1000000) / 1000);
    const remainder = num % 1000;
  
    if (billions) {
      parts.push(convertLessThanOneThousand(billions) + ' Billion');
    }
    if (millions) {
      parts.push(convertLessThanOneThousand(millions) + ' Million');
    }
    if (thousands) {
      parts.push(convertLessThanOneThousand(thousands) + ' Thousand');
    }
    if (remainder) {
      parts.push(convertLessThanOneThousand(remainder));
    }
  
    return parts.join(' ').trim();
  }