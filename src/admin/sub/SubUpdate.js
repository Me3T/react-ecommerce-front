import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryForm from "../../components/forms/CategoryForm";
import LocalSearch from "../../components/forms/LocalSearch";
import AdminNav from "../../components/routes/Nav/AdminNav";
import { getCategories } from "../../functions/category";
import { createSub, getSub, removeSub, updateSub } from "../../functions/sub";

function SubUpdate({ history, match }) {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [parent, setParent] = useState("");
  // Step 1 for searching and filtering

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSub = () =>
    getSub(match.params.slug).then((s) => {
      setName(s.data.name);
      setParent(s.data.parent);
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSub(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}"is updated`);
        history.push("/admin/sub");
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  /* Above function is used to create categories*/

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <AdminNav />
          </div>
          <div className="col">
            {loading ? (
              <h4 className="red-danger">Loading...</h4>
            ) : (
              <h4>Update Sub Category</h4>
            )}

            <div className="form-group">
              <label>Parent Category</label>
              <select
                name="category"
                className="form-control"
                onChange={(e) => setParent(e.target.value)}
              >
                <option>Please Select </option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option
                      key={c._id}
                      value={c._id}
                      selected={c._id === parent}
                    >
                      {" "}
                      {c.name}
                    </option>
                  ))}
              </select>
            </div>

            <CategoryForm
              handleSubmit={handleSubmit}
              name={name}
              setName={setName}
            />

            {/*the above code will map through categories and show them*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubUpdate;
