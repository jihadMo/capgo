//! Duress Passphrase & Decoy Vault Helper for KasSigner

pub struct DuressWalletConfig {
    pub is_duress_active: bool,
    pub decoy_index: u32,
}

impl DuressWalletConfig {
    pub fn new() -> Self {
        Self {
            is_duress_active: false,
            decoy_index: 0,
        }
    }

    /// Evaluates if entered passphrase matches pre-configured duress hash.
    pub fn verify_passphrase(&mut self, entered_hash: &[u8; 32], duress_hash: &[u8; 32]) -> bool {
        let mut diff = 0u8;
        for i in 0..32 {
            diff |= entered_hash[i] ^ duress_hash[i];
        }
        if diff == 0 {
            self.is_duress_active = true;
            self.decoy_index = 9999;
            return true;
        }
        false
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_duress_passphrase_activation() {
        let mut config = DuressWalletConfig::new();
        let duress_hash = [0x42u8; 32];
        let entered_hash = [0x42u8; 32];

        assert!(config.verify_passphrase(&entered_hash, &duress_hash));
        assert!(config.is_duress_active);
        assert_eq!(config.decoy_index, 9999);
    }
}
