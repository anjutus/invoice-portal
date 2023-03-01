
import LandingPage from './Pages/LandingPage';
import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import {MemoryRouter} from 'react-router-dom'
import App from './App';
import {createMemoryHistory} from 'history'
import LoginButton from './auth/LoginButton';
import DashboardApp from './Pages/DashboardApp';
import { InvoiceData } from './utils/PieData';
import { QueryClient, QueryClientProvider } from 'react-query';
//import { shallow,render } from 'enzyme';
  test('Landing Page', async () => {
    const route='/';
    render(
      <MemoryRouter initialEntries={[route]}>
        <LandingPage />
      </MemoryRouter>,
    )
    
    expect(screen.getByTestId('Welcome-text')).toHaveTextContent('Welcome please login to Invoice portal')
    // const wrapper = shallow(<LoginButton/>)
    // wrapper.find('button').simulate('click');
    // expect(wrapper.contains()).toHaveBeenCalled()
    //userEvent.click(screen.getByTestId('LoginButton'));
    //expect(screen.getByText(/ to continue to Invoice Portal App./i)).toBeInTheDocument()
  })
  // test('Dashboard Page', async () => {
  //   const Mockdata=InvoiceData;
  //   const queryClient = new QueryClient();
  //   jest.mock('react-query', () => ({
  //     useQuery: jest.fn().mockReturnValue(({ data: {...Mockdata}, isLoading: false,error:{} }))
  //   }));
  //   const route='/';
  //   render(
  //     <MemoryRouter initialEntries={[route]}>
  //       <QueryClientProvider  client={queryClient}>
  //       <DashboardApp />
  //       </QueryClientProvider>
  //     </MemoryRouter>,
  //   )
  //   expect(screen.getAllByText('Number of Invoices')).toBeInTheDocument();
  //   expect(screen.getAllByText('Invoice Amount')).toBeInTheDocument();
  //   expect(getByText("Pending")).toBeInTheDocument();
  // })


