import * as Papa from 'papaparse';

export async function fetchAndParseCSV(): Promise<string[][]> {
  try {
    const response = await fetch('../assets/data/veneto-values-xybv.csv');
    const text = await response.text();

    const result = Papa.parse(text, {
      header: false,
      dynamicTyping: true,
    });

    if (result.data) {
      const parsedData: string[][] = result.data as string[][];
      console.log(parsedData)
      return parsedData;
    }
  } catch (error) {
    console.error('Error parsing CSV:', error);
  }

  return [];
}