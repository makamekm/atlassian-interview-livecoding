import * as React from 'react';
import { ListTree } from '../components/ListTree';
import { DataItem, SELECTED_ID } from '../components/types';
import { DataItemDto, fetchData } from '../resources/data';

function convertDtoRecursive(data: DataItemDto[]): {
  data: DataItem[];
  hasActiveChilden: boolean;
} {
  let hasActiveChilden = false;
  const result: DataItem[] = [];

  for (let item of data) {
    const pass = item?.children && convertDtoRecursive(item.children);
    const isActive = item.id === SELECTED_ID;
    hasActiveChilden = hasActiveChilden
      || pass?.hasActiveChilden
      || isActive;
    result.push({
      ...item,
      isActive,
      isOpened: hasActiveChilden,
      children: pass?.data,
    });
  }

  return {
    hasActiveChilden,
    data: result,
  };
}

function convertDto(data: DataItemDto[]): DataItem[] {
  const result = convertDtoRecursive(data);
  console.log(data, result);
  
  return result.data;
}

export default function Home() {
  const [data, setData] = React.useState<DataItem[]>(null);
  const [errorMessage, setErrorMessage] = React.useState<string>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const loadData = React.useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetchData();
      setData(convertDto(response));
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="container">
      {!isLoading && errorMessage && <>errorMessage</>}
      {isLoading && data ? <>Loading</> : <ListTree data={data} />}
      
      <style jsx>{`
        .container {
          margin: 10px;
        }
      `}</style>
    </div>
  )
}
