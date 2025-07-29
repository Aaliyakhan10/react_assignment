import { useEffect, useRef, useState } from 'react'
import { Paginator } from 'primereact/paginator';
import './App.css'
import axios from 'axios';
import { DataTable} from 'primereact/datatable';
import { Column } from 'primereact/column';

import { OverlayPanel } from 'primereact/overlaypanel';
  
import { ProgressSpinner } from 'primereact/progressspinner';
              
import 'primeicons/primeicons.css';
 
import { InputText } from 'primereact/inputtext';
 import { Button } from 'primereact/button';              
interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display:string;
  inscriptions:string;
  date_start:string;
  date_end:string
}  
        
function App() {
  const [page, setPage] = useState(1);
  
  const [data, setdata] = useState<Artwork[]>([]);
  const [selectedRows, setSelectedRows] = useState<Artwork[]>([]);
    const [first, setFirst] = useState<number>(0); 
  const [rows, setRows] = useState(10);  
   const [numPage, setNumPage] = useState<string>('');

   const [isLoading, setIsLoading] = useState<boolean>(false);
 const onPageChange = (e: { first: number; rows: number; page: number }) => {
    setFirst(e.first);     
    setRows(e.rows);       
    setPage(e.page + 1);   
   
  }; 
 const op = useRef<OverlayPanel>(null);

  
  useEffect(() => {
    getData();
   
  }, [page])
  
  const getData=async()=>{
    try {
      setIsLoading(true);
      const res=await axios.get( `https://api.artic.edu/api/v1/artworks?page=${page}`);

        const newData: Artwork[] = res.data.data;
      setdata(newData);
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }finally{
      setIsLoading(false);
    }
  }
 useEffect(() => {
  if (numPage && parseInt(numPage) > 0) {
    handleSel(); 
  }
  
}, [data]);
  
 const handleSel = () => {
  const n = parseInt(numPage);
  if (!isNaN(n) && n > 0) {
    const selected = data.slice(0, n); 
    const remaining = n - selected.length;

    setSelectedRows([...selectedRows, ...selected]);
    setNumPage(remaining.toString()); 
  }
  op.current?.hide();
};

  return (
    <>
    {isLoading && (
        <div className="card h-screen flex justify-center items-center">
          <ProgressSpinner />
        </div>
      )}
      {
        !isLoading &&
      <div>

  <DataTable
          value={data}
      
          rows={12}
           selectionMode="multiple"
          selection={selectedRows}
          onSelectionChange={(e) => setSelectedRows(e.value as Artwork[])}
          dataKey="id"
  

        >
          
             <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
              <Column header={<i className="pi pi-angle-down"onClick={(e) => op.current?.toggle(e)} style={{ color: '#708090' }}></i>}></Column>
    <Column field="title" header="Title"></Column>
    <Column field="place_of_origin" header="Place of Origin"></Column>
    <Column field="artist_display" header="Artist Display"></Column>
    <Column field="inscriptions" header="Inscription"></Column>
    <Column field="date_start" header="Date Start"></Column>
    <Column field="date_end" header="Date End"></Column>
  
</DataTable>
         <Paginator first={first} rows={rows} totalRecords={120}  onPageChange={onPageChange} />
         <OverlayPanel ref={op}>
          <div>
      <InputText type="number" placeholder="Enter row number.." value={numPage} onChange={(e) => setNumPage(e.target.value)}  />
    <Button label="Submit" type='submit' style={{color:"blue", margin:"7px"}} onClick={handleSel}/>
          </div>
    
</OverlayPanel>
      </div>
}
    </>
  )
}

export default App
