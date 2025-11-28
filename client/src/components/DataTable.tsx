import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { useState } from 'react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  pageSize?: number;
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
}

export default function DataTable<T extends { id: string | number }>({ 
  data, 
  columns, 
  pageSize = 10, 
  onRowClick,
  emptyMessage = 'No data available'
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedData = data.slice(startIndex, startIndex + pageSize);

  const getValue = (item: T, key: string): React.ReactNode => {
    const keys = key.split('.');
    let value: unknown = item;
    for (const k of keys) {
      value = (value as Record<string, unknown>)?.[k];
    }
    return value as React.ReactNode;
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {columns.map((col) => (
                <TableHead key={col.key.toString()} className={col.className}>
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow 
                key={item.id}
                className={`${onRowClick ? 'cursor-pointer hover-elevate' : ''} ${index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}`}
                onClick={() => onRowClick?.(item)}
                data-testid={`table-row-${item.id}`}
              >
                {columns.map((col) => (
                  <TableCell key={col.key.toString()} className={col.className}>
                    {col.render ? col.render(item) : getValue(item, col.key.toString())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + pageSize, data.length)} of {data.length} entries
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              data-testid="pagination-first"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(p => p - 1)}
              disabled={currentPage === 1}
              data-testid="pagination-prev"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="px-4 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(p => p + 1)}
              disabled={currentPage === totalPages}
              data-testid="pagination-next"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              data-testid="pagination-last"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
