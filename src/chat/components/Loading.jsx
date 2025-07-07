export default function Loading() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
        }}>
            <div className="spinner" />
            <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>Chargement...</p>

            <style>
                {`
                    .spinner {
                        width: 40px;
                        height: 40px;
                        border: 4px solid #fe4310;
                        border-top: 4px solid transparent;
                        border-radius: 50%;
                        animation: spin 1s linear infinite;
                    }

                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                `}
            </style>
        </div>
    );
}
