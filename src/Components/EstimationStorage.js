
export const saveEstimationToStorage = (estimationData) => {
    try {

      const existingEstimations = JSON.parse(localStorage.getItem('estimations')) || [];
      
  
      existingEstimations.push(estimationData);
      
      // Save back to localStorage
      localStorage.setItem('estimations', JSON.stringify(existingEstimations));
      
      return true;
    } catch (error) {
      console.error('Error saving Estimation:', error);
      return false;
    }
  };
  
  export const getLastEstimationNumber = () => {
    try {
      const estimations = JSON.parse(localStorage.getItem('estimations')) || [];
      if (estimations.length === 0) return 'EST-001';
      
      
      const lastEstimation = estimations[estimations.length - 1];
      const lastNumber = parseInt(lastEstimation.estimationNumber.split('-')[1]);
      return `EST-${String(lastNumber + 1).padStart(3, '0')}`;
    } catch (error) {
      console.error('Error getting last estimation number:', error);
      return 'EST-001';
    }
  };
  
  export const getAllEstimations = () => {
    try {
      return JSON.parse(localStorage.getItem('estimations')) || [];
    } catch (error) {
      console.error('Error getting estimations:', error);
      return [];
    }
  };