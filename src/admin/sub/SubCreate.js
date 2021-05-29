import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import CategoryForm from "../../components/forms/CategoryForm";
import LocalSearch from "../../components/forms/LocalSearch";
import AdminNav from "../../components/routes/Nav/AdminNav";
import { getCategories } from "../../functions/category";
import { createSub, getSub, removeSub, getSubs } from "../../functions/sub";

function SubCreate() {
  const { user } = useSelector((state) => ({ ...state }));
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subs, setSubs] = useState([]);
  // Step 1 for searching and filtering

  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadCategories();
    loadSubs();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

  const loadSubs = () => getSubs().then((s) => setSubs(s.data));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSub({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`"${res.data.name}"is created`);
        loadSubs();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response.status === 400) toast.error(err.response.data);
      });
  };
  /* Above function is used to create categories*/

  const handleRemove = async (slug) => {
    if (window.confirm("Delete?")) {
      setLoading(true);
      removeSub(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} deleted`);
          loadSubs();
        })
        .catch((err) => {
          if (err.response.status === 400) {
            toast.error(err.response.data);
          }
        });
    }
  };
  {
    /* Step 3 for search and filtering*/
  }

  {
    /* Step 4 for search and filtering */
  }

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

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
              <h4>Create Sub Category</h4>
            )}

            {/*---------------------------- VERY IMPORTANT------------------------------*/}

            <div className="form-group">
              <label>Parent Category</label>
              <select
                name="category"
                className="form-control"
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>Please Select </option>
                {categories.length > 0 &&
                  categories.map((c) => (
                    <option key={c._id} value={c._id}>
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

            <LocalSearch keyword={keyword} setKeyword={setKeyword} />

            {subs.filter(searched(keyword)).map((s) => (
              <div className="alert alert-secondary" key={s._id}>
                {s.name} {""}
                <span
                  onClick={() => handleRemove(s.slug)}
                  className="btn btn-sm float-right"
                >
                  <DeleteOutlined className="text-danger" />
                </span>
                {""}
                <Link to={`/admin/sub/${s.slug}`}>
                  <span className="btn btn-sm float-right">
                    <EditOutlined className="text-warning" />
                  </span>
                </Link>
              </div>
            ))}
            {/*the above code will map through categories and show them*/}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubCreate;
