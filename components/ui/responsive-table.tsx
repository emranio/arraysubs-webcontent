import React from 'react';

interface TableNodeProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
  'data-label'?: string;
}

interface ResponsiveTableProps extends React.ComponentPropsWithoutRef<'table'> {
  children?: React.ReactNode;
}

function extractTextContent(node: React.ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node).replace(/\s+/g, ' ').trim();
  }

  if (Array.isArray(node)) {
    return node.map(extractTextContent).filter(Boolean).join(' ').replace(/\s+/g, ' ').trim();
  }

  if (React.isValidElement<TableNodeProps>(node)) {
    return extractTextContent(node.props.children);
  }

  return '';
}

function getChildByType(children: React.ReactNode, type: 'caption' | 'thead' | 'tbody') {
  return React.Children.toArray(children).find(
    (child): child is React.ReactElement<TableNodeProps> =>
      React.isValidElement<TableNodeProps>(child) && child.type === type,
  );
}

function getRows(children: React.ReactNode) {
  return React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TableNodeProps> =>
      React.isValidElement<TableNodeProps>(child) && child.type === 'tr',
  );
}

function getCells(children: React.ReactNode) {
  return React.Children.toArray(children).filter(
    (child): child is React.ReactElement<TableNodeProps> =>
      React.isValidElement<TableNodeProps>(child)
      && (child.type === 'th' || child.type === 'td'),
  );
}

function getHeaderLabels(children: React.ReactNode): string[] {
  const thead = getChildByType(children, 'thead');
  const firstRow = thead ? getRows(thead.props.children)[0] : undefined;

  if (!firstRow) {
    return [];
  }

  return getCells(firstRow.props.children).map((cell, index) => (
    extractTextContent(cell.props.children) || `Column ${index + 1}`
  ));
}

function getColumnCount(children: React.ReactNode, headerLabels: string[]): number {
  if (headerLabels.length > 0) {
    return headerLabels.length;
  }

  const tbody = getChildByType(children, 'tbody');
  const firstRow = tbody ? getRows(tbody.props.children)[0] : getRows(children)[0];

  return firstRow ? getCells(firstRow.props.children).length : 0;
}

function annotateBodyCells(children: React.ReactNode, headerLabels: string[]) {
  return React.Children.map(children, (section) => {
    if (!React.isValidElement<TableNodeProps>(section) || section.type !== 'tbody') {
      return section;
    }

    const rows = React.Children.map(section.props.children, (row) => {
      if (!React.isValidElement<TableNodeProps>(row) || row.type !== 'tr') {
        return row;
      }

      let cellIndex = 0;
      const cells = React.Children.map(row.props.children, (cell) => {
        if (
          !React.isValidElement<TableNodeProps>(cell)
          || (cell.type !== 'td' && cell.type !== 'th')
        ) {
          return cell;
        }

        const label = headerLabels[cellIndex] || `Column ${cellIndex + 1}`;
        cellIndex += 1;

        return React.cloneElement(cell, { 'data-label': label });
      });

      return React.cloneElement(row, undefined, cells);
    });

    return React.cloneElement(section, undefined, rows);
  });
}

export function ResponsiveTable({ children, className = '', ...props }: ResponsiveTableProps) {
  const headerLabels = getHeaderLabels(children);
  const columnCount = Math.max(getColumnCount(children, headerLabels), 1);
  const caption = getChildByType(children, 'caption');
  const captionText = caption ? extractTextContent(caption.props.children) : '';
  const annotatedChildren = headerLabels.length > 0
    ? annotateBodyCells(children, headerLabels)
    : children;
  const rootClassName = [
    'responsive-table',
    headerLabels.length > 0 && columnCount > 1 ? 'responsive-table--stackable' : 'responsive-table--scroll-only',
    columnCount > 4 ? 'responsive-table--dense' : '',
  ].filter(Boolean).join(' ');
  const tableClassName = ['responsive-table__table', className].filter(Boolean).join(' ');
  const scrollAccessibilityProps = columnCount > 2
    ? {
        role: 'region' as const,
        tabIndex: 0,
        'aria-label': captionText || 'Scrollable table',
      }
    : {};

  return (
    <div
      className={rootClassName}
      style={{ '--responsive-table-columns': String(columnCount) } as React.CSSProperties}
    >
      <div className="responsive-table__scroll" {...scrollAccessibilityProps}>
        <table {...props} className={tableClassName} data-column-count={columnCount}>
          {annotatedChildren}
        </table>
      </div>
    </div>
  );
}
