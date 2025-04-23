import { Button } from 'antd';

const SubmitButton = ({ loading, label }) => (
  <Button
    type="primary"
    htmlType="submit"    // ← indispensable
    loading={loading}
  >
    {label}
  </Button>
);

export default SubmitButton;
