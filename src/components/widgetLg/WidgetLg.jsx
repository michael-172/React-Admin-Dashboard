import './widgetlg.css';


export default function WidgetSm() {

  const Button = ({type}) => {
    return(
      <button className={'lgWidgetButton ' + type} >{type}</button>
    )
  }

  return (
    <div className='lgWidget'>
      <h3 className="lgWidgetTitle">Latest Transactions</h3>
      <table className="lgWidgetTable">
        <tr>
          <th className='lgWidgetTh'>Customer</th>
          <th className='lgWidgetTh'>Date</th>
          <th className='lgWidgetTh'>Amount</th>
          <th className='lgWidgetTh'>Status</th>
        </tr>

        <tr>
          <td className='lgWidgetUser'>
            <img src="/assets/2.jpeg" alt="" className='lgWidgetImg'/>
            <span className="username">Carol Danne</span>
          </td>
          <td className='lgWidgetDate'>2 Jun 2022</td>
          <td className='lgWidgetAmount'>$122.00</td>
          <td className='lgWidgetStatus'>
            <Button type="Approved"/>
          </td>
        </tr>


        <tr>
          <td className='lgWidgetUser'>
            <img src="/assets/2.jpeg" alt="" className='lgWidgetImg'/>
            <span className="username">Carol Danne</span>
          </td>
          <td className='lgWidgetDate'>2 Jun 2022</td>
          <td className='lgWidgetAmount'>$122.00</td>
          <td className='lgWidgetStatus'>
            <Button type="Declined"/>
          </td>
        </tr>

        <tr>
          <td className='lgWidgetUser'>
            <img src="/assets/2.jpeg" alt="" className='lgWidgetImg'/>
            <span className="username">Carol Danne</span>
          </td>
          <td className='lgWidgetDate'>2 Jun 2022</td>
          <td className='lgWidgetAmount'>$122.00</td>
          <td className='lgWidgetStatus'>
            <Button type="Pending"/>
          </td>
        </tr>

        <tr>
          <td className='lgWidgetUser'>
            <img src="/assets/2.jpeg" alt="" className='lgWidgetImg'/>
            <span className="username">Carol Danne</span>
          </td>
          <td className='lgWidgetDate'>2 Jun 2022</td>
          <td className='lgWidgetAmount'>$122.00</td>
          <td className='lgWidgetStatus'>
            <Button type="Pending"/>
          </td>
        </tr>

        <tr>
          <td className='lgWidgetUser'>
            <img src="/assets/2.jpeg" alt="" className='lgWidgetImg'/>
            <span className="username">Carol Danne</span>
          </td>
          <td className='lgWidgetDate'>2 Jun 2022</td>
          <td className='lgWidgetAmount'>$122.00</td>
          <td className='lgWidgetStatus'>
            <Button type="Approved"/>
          </td>
        </tr>

      </table>
    </div>
  )
}
