/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { getYear } from 'date-fns';
import MonthlyFrequencyChart from '../components/charts/MonthlyFrequencyChart';
import RegionalDistributionChart from '../components/charts/RegionalDistributionChart';
import { FolderStructureGrid } from '../components/FolderStructureGrid';

const StatsPage: React.FC = () => {
  const currentYear = getYear(new Date());
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const years = Array(getYear(new Date()) - 2003 + 1)
    .fill(0)
    .map((_, idx) => 2003 + idx);

  const onChangeYear: (e: React.ChangeEvent<HTMLSelectElement>) => void = (
    e
  ) => {
    if (!e.target.value) return;
    setSelectedYear(+e.target.value);
  };

  return (
    <div>
      <h2>Stats</h2>
      <Form>
        <Form.Group controlId="year-select">
          <Form.Select
            css={css`
              width: 100px;
            `}
            defaultValue={currentYear}
            onChange={onChangeYear}
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Form>
      <div
        css={css`
          display: flex;
          align-items: center;
          flex-direction: row;
          flex-wrap: wrap;
        `}
      >
        <MonthlyFrequencyChart selectedYear={selectedYear} />
        <RegionalDistributionChart selectedYear={selectedYear} />
      </div>
      <div>
        <FolderStructureGrid />
      </div>
    </div>
  );
};

export default StatsPage;
