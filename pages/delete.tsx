// pages/delete.tsx
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect } from 'react'; // Tambahkan impor ini

const Delete = () => {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      axios.delete('/api/items', { data: { id } }).then(() => {
        router.push('/');
      }).catch(error => {
        console.error('Error deleting item:', error);
        // Optional: Handle error state
      });
    }
  }, [id]);

  return <div>Deleting...</div>;
};

export default Delete;
