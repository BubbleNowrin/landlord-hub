
import React, {  useState } from 'react'
import { PhotoProvider, PhotoView } from 'react-photo-view';

const SinglePropertyTable = ({ current, tableRef,tableData,allYears,setYear,refetch}) => {
  
  const [loading, setLoading] = useState(false);


  

  const uploadPhoto = (id, e) => {
    setLoading(true);
    const image = e.target.files[0];
    // console.log(id);

    const img_api = "701a0d7cdce71a8410d4cf17c044dfba";

    // create form Data
    const formData = new FormData();
    formData.append("image", image);

    const url = `https://api.imgbb.com/1/upload?key=${img_api}`;

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((image) => {
        const img = image.data.url;
        const data = { img };
        fetch(`http://localhost:5000/upload_photo/${id}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            if(data.modifiedCount > 0){
                refetch()
                setLoading(false)
            }
          });
      });
  };
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto mt-20 mb-10">
        <div className='flex justify-between'>
          <div className="flex mb-10 gap-4 items-center justify-start">
            {allYears?.map((singleYear) => (
              <button
                onClick={() => setYear(singleYear)}
                className="btn btn-outline"
              >
                {singleYear}
              </button>
            ))}
          </div>
          <div>
            <button
              onClick={() => setYear(current.toString())}
              className="btn btn-outline"
            >
              Show All
            </button>
          </div>
        </div>
        <table className="table w-full" ref={tableRef}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              <th>Description</th>
              <th>Receipt</th>
            </tr>
          </thead>
          <tbody>
            {/* {
                                singleProperty?.calculations?.filter(prop => prop.expense).map((expenses, idx) => <ExpensesTable
                                    key={idx}
                                    expenses={expenses}
                                ></ExpensesTable>)
                            } */}

            {tableData?.map((calc) => (
              <tr
                key={calc?._id}
                className={calc?.expense ? "text-red-500" : "text-green-500"}
              >
                <td>{calc?.date}</td>
                <td>{calc?.category}</td>
                <td>{calc?.amount}</td>
                <td>{calc?.expense ? "Expense" : "Payment"}</td>
                {calc.description.length > 50 ? (
                  <td className="max-w-sm text-ellipsis">
                    <textarea cols="50">{calc?.description}</textarea>
                  </td>
                ) : (
                  <td className="max-w-sm text-ellipsis">
                    {calc?.description}
                  </td>
                )}

                {calc?.expense && (
                  <>
                    {calc?.receipt ? (
                      //   <label
                      //     htmlFor="my-modal-3"
                      //     className="btn btn-outline w-full"
                      //   >
                      //     view receipt
                      //   </label>
                      <td>
                        <PhotoProvider>
                          <PhotoView src={calc?.receipt}>
                            <button className="btn btn-md btn-primary w-full">
                              View Receipt
                            </button>
                          </PhotoView>
                        </PhotoProvider>
                      </td>
                    ) : (
                      <td>
                        {loading ? (
                          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin mx-auto"></div>
                        ) : (
                          <input
                            type="file"
                            name=""
                            id=""
                            onChange={(e) => uploadPhoto(calc?._id, e)}
                          />
                        )}
                      </td>
                    )}
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SinglePropertyTable