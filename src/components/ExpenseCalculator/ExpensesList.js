
const ExpensesList = ({ items, removeItem }) => {
    return (
        <table className="listTable">
            <thead>
                <tr>
                    <th>Amount</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Remove?</th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.id} className="item">
                        <td>{item.amount}</td>
                        <td>{item.name}</td>
                        <td>{item.category}</td>
                        <td>
                            <span
                                className="removeItem"
                                onClick={() => removeItem(item)}
                            >
                                ❌
                            </span>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ExpensesList;