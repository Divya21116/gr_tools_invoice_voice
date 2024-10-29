
export const saveChallanToStorage = (challanData) => {
    try {

      const existingChallans = JSON.parse(localStorage.getItem('challans')) || [];
      
  
      existingChallans.push(challanData);
      
      // Save back to localStorage
      localStorage.setItem('challans', JSON.stringify(existingChallans));
      
      return true;
    } catch (error) {
      console.error('Error saving challan:', error);
      return false;
    }
  };
  
  export const getLastChallanNumber = () => {
    try {
      const challans = JSON.parse(localStorage.getItem('challans')) || [];
      if (challans.length === 0) return 'DC-001';
      
      
      const lastChallan = challans[challans.length - 1];
      const lastNumber = parseInt(lastChallan.challanNumber.split('-')[1]);
      return `DC-${String(lastNumber + 1).padStart(3, '0')}`;
    } catch (error) {
      console.error('Error getting last challan number:', error);
      return 'DC-001';
    }
  };
  
  export const getAllChallans = () => {
    try {
      return JSON.parse(localStorage.getItem('challans')) || [];
    } catch (error) {
      console.error('Error getting challans:', error);
      return [];
    }
  };