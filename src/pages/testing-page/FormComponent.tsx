import React, { useState } from 'react';

const FormComponent = () => {
    const [keyword, setKeyword] = useState('');
    const [details, setDetails] = useState('');
    const [data, setData] = useState<{ [key: string]: string }>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setData(prevData => ({ ...prevData, [keyword]: details }));
        setKeyword('');
        setDetails('');
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Enter keyword"
                />
                <textarea
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Enter details"
                />
                <button type="submit">Add</button>
            </form>
            <div>
                {Object.entries(data).map(([key, value]) => (
                    <div key={key}>
                        <span
                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                            title={value}
                        >
                            {key}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FormComponent;
